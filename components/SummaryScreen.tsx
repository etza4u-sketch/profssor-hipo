import React, { useState, useEffect, useMemo } from 'react';
import { Answers, Category, PatientDetails } from '../types';
import { getAnswerOptions } from '../constants';
import { GoogleGenAI } from '@google/genai';
import { getCategoryScoreDetails } from '../utils/scoreUtils';
import { useTranslations } from '../hooks/useTranslations';
import { enqueueGenerateContent } from '../utils/geminiUtils';

interface SummaryScreenProps {
  answers: Answers;
  categories: Category[];
  onStartOver: () => void;
  patientDetails: PatientDetails;
  onNavigateToResources: () => void;
  cachedSummary: string | undefined;
  setCachedSummary: (summary: string) => void;
}

const markdownToHtml = (text: string) => {
  return text
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold my-3 text-slate-800">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .split('\n')
    .map(line => line.trim() === '---' ? '<hr class="my-4 border-slate-300" />' : line)
    .join('<br />')
    .replace(/<br \/>\* (.*?)(<br \/>|$)/g, '<li class="ms-4 list-disc">$1</li>')
    .replace(/<br \/><br \/>/g, '<p class="my-2"></p>');
};

const ClipboardIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const DownloadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);


const SummaryScreen: React.FC<SummaryScreenProps> = ({
  answers,
  categories,
  onStartOver,
  patientDetails,
  onNavigateToResources,
  cachedSummary,
  setCachedSummary,
}) => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const { t } = useTranslations();
  const ANSWER_OPTIONS = useMemo(() => getAnswerOptions(t), [t]);

  const categoryScores = useMemo(() => {
    return categories.map(category => ({
        ...category,
        scoreDetails: getCategoryScoreDetails(category, answers, t)
    }));
  }, [categories, answers, t]);

  const overallScoreDetails = useMemo(() => {
    const allQuestions = categories.flatMap(c => c.questions);
    const dummyCategory: Category = { id: 0, title: 'Overall', explanation: '', questions: allQuestions };
    return getCategoryScoreDetails(dummyCategory, answers, t);
  }, [categories, answers, t]);


  const reportText = useMemo(() => {
    let text = `${t('summary.report.title')}\n\n`;
    text += `${t('summary.report.therapist')}: ${t('patientDetails.therapist_name')}\n`;
    if (patientDetails.name || patientDetails.phone || patientDetails.email) {
      text += `${t('summary.report.patient_details')}:\n`;
      if (patientDetails.name) text += `${t('summary.report.name')}: ${patientDetails.name}\n`;
      if (patientDetails.phone) text += `${t('summary.report.phone')}: ${patientDetails.phone}\n`;
      if (patientDetails.email) text += `${t('summary.report.email')}: ${patientDetails.email}\n`;
    }
    text += `\n--- ${t('summary.report.scores_summary')} ---\n`;
    text += `${t('summary.report.overall_score')}: ${overallScoreDetails.percentage}% (${overallScoreDetails.label})\n\n`;
    
    categoryScores.forEach(({ title, scoreDetails }) => {
        text += `${title}: ${scoreDetails.percentage}% (${scoreDetails.label})\n`;
    });

    if (summary) {
      text += `\n--- ${t('summary.report.ai_analysis')} ---\n\n${summary.replace(/<br \/>/g, '\n')}\n\n`;
    }

    text += `\n--- ${t('summary.report.answers_details')} ---\n\n`;
    categories.forEach(category => {
      text += `${category.title}\n`;
      category.questions.forEach(question => {
        const answerValue = answers[question.id];
        const answer = ANSWER_OPTIONS.find(opt => opt.value === answerValue);
        text += `${question.id}. ${question.text}\n`;
        text += `   ${t('summary.report.answer')}: ${answer ? answer.text : t('summary.report.not_answered')}\n`;
      });
      text += `\n`;
    });

    text += `\n--- ${t('summary.report.important_note_title')} ---\n`;
    text += `${t('summary.report.important_note_text')}\n`;

    return text;
  }, [answers, categories, patientDetails, summary, categoryScores, overallScoreDetails, t, ANSWER_OPTIONS]);

  useEffect(() => {
    const generateSummary = async () => {
      if (cachedSummary) {
        setSummary(cachedSummary);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setSummary('');

      try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
          throw new Error("API key is not configured.");
        }
        const ai = new GoogleGenAI({ apiKey });

        const answersText = categories
          .map(category => {
            const questionAnswers = category.questions
              .map(q => {
                const answer = ANSWER_OPTIONS.find(opt => opt.value === answers[q.id]);
                return `- ${q.text}: ${answer ? answer.text : t('summary.report.not_answered')} (Score: ${answers[q.id]})`;
              })
              .join('\n');
            return `**${category.title}**\n${questionAnswers}`;
          })
          .join('\n\n');

        const patientInfo = `
          Name: ${patientDetails.name || 'Not provided'}
          Phone: ${patientDetails.phone || 'Not provided'}
          Email: ${patientDetails.email || 'Not provided'}
        `.trim();

        const severeOrCriticalCategoriesCount = categoryScores.filter(
          cs => cs.scoreDetails.severity === 'severe' || cs.scoreDetails.severity === 'critical'
        ).length;
      
        const shouldAddUrgentMessage = severeOrCriticalCategoriesCount >= 2 || overallScoreDetails.percentage > 75;

        const prompt = t('prompts.summary', {
            patientInfo,
            answersText,
            overallScore: `${overallScoreDetails.percentage}% (${overallScoreDetails.label})`,
            categoryScores: categoryScores.map(cs => `- ${cs.title}: ${cs.scoreDetails.percentage}% (${cs.scoreDetails.label})`).join('\n'),
            urgentMessagePrompt: shouldAddUrgentMessage ? t('prompts.summary_urgent_addition') : ''
        });
        
        const response = await enqueueGenerateContent(ai, {
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        setSummary(response.text);
        setCachedSummary(response.text);

      } catch (e: any) {
        console.error("Error generating summary:", e);
        if (e.message?.includes("API key not valid") || e.message?.includes("API key is not configured")) {
           setError(t('summary.error.config'));
        } else if (e.toString().includes("429")) { 
          setError(t('summary.error.rate_limit'));
        }
        else {
           setError(t('summary.error.generic'));
        }
      } finally {
        setIsLoading(false);
      }
    };
    generateSummary();
  }, [answers, categories, patientDetails, categoryScores, overallScoreDetails, t, ANSWER_OPTIONS, cachedSummary, setCachedSummary]);
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(reportText).then(() => {
      setCopySuccess(t('summary.copy_success'));
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
      setCopySuccess(t('summary.copy_fail'));
    });
  };

  const handleDownload = () => {
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const patientName = patientDetails.name || 'report';
    link.download = `health-anxiety-report-${patientName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="space-y-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-teal-800 text-center">{t('summary.title')}</h2>

        <div className={`p-4 rounded-lg border-s-4 ${overallScoreDetails.colorClasses.bg} ${overallScoreDetails.colorClasses.border}`}>
            <h3 className={`text-lg font-bold ${overallScoreDetails.colorClasses.text}`}>{t('summary.overall_score_label')}: ${overallScoreDetails.label} (${overallScoreDetails.percentage}%)</h3>
        </div>
        
        <div className="p-6 rounded-lg border-2 border-slate-200 bg-slate-50/50">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">{t('summary.scores_by_category')}</h3>
          <div className="space-y-4">
            {categoryScores.map(({ id, title, scoreDetails }) => (
              <div key={id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-slate-700">{title}</span>
                  <span className={`text-sm font-bold ${scoreDetails.colorClasses.text}`}>
                    {scoreDetails.label} ({scoreDetails.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5" role="progressbar" aria-label={`Score for ${title}`} aria-valuenow={scoreDetails.percentage} aria-valuemin={0} aria-valuemax={100}>
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${scoreDetails.colorClasses.bg.replace('100', '500')}`}
                    style={{ width: `${scoreDetails.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-lg border-2 border-slate-200 bg-slate-50/50">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">{t('summary.ai_analysis_title')}</h3>
            {isLoading ? (
                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-slate-600">
                    <div className="w-6 h-6 border-4 border-teal-500 border-dashed rounded-full animate-spin"></div>
                    <span>{t('summary.loading_ai')}</span>
                </div>
            ) : error ? (
                <div className="text-center p-4 bg-red-100 rounded-lg border border-red-300">
                    <p className="font-semibold text-red-800">{t('summary.error.title')}</p>
                    <p className="text-red-700 mb-4">{error}</p>
                </div>
            ) : (
                <div className="prose prose-slate max-w-none text-start leading-relaxed" dangerouslySetInnerHTML={{ __html: markdownToHtml(summary) }} />
            )}
        </div>

        <div className="text-center py-4">
             <button
                onClick={onNavigateToResources}
                className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                {t('summary.resources_button')}
            </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 border-t border-slate-200">
            <button
                onClick={handleCopyToClipboard}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-x-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:scale-105"
            >
                <ClipboardIcon />
                <span>{copySuccess ? copySuccess : t('summary.copy_button')}</span>
            </button>
            <button
                onClick={handleDownload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-x-2 bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 transform hover:scale-105"
            >
                <DownloadIcon />
                <span>{t('summary.download_button')}</span>
            </button>
            <button
                onClick={onStartOver}
                className="w-full sm:w-auto bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
            >
                {t('summary.start_over_button')}
            </button>
        </div>
        
    </div>
  );
};

export default SummaryScreen;