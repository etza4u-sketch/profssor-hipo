import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Answers, Category } from '../types';
import { getAnswerOptions } from '../constants';
import { GoogleGenAI } from '@google/genai';
import { getCategoryScoreDetails } from '../utils/scoreUtils';
import { useTranslations } from '../hooks/useTranslations';
import { enqueueGenerateContent } from '../utils/geminiUtils';

interface CategorySummaryModalProps {
  category: Category;
  answers: Answers;
  onClose: () => void;
  cachedInsight: string | undefined;
  setCachedInsight: (insight: string) => void;
}

const markdownToHtml = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');
};

const CategorySummaryModal: React.FC<CategorySummaryModalProps> = ({ category, answers, onClose, cachedInsight, setCachedInsight }) => {
  const [insight, setInsight] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const { t } = useTranslations();
  const ANSWER_OPTIONS = useMemo(() => getAnswerOptions(t), [t]);

  const scoreDetails = useMemo(() => getCategoryScoreDetails(category, answers, t), [category, answers, t]);

  useEffect(() => {
    const generateInsight = async () => {
      if (cachedInsight) {
        setInsight(cachedInsight);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setInsight('');

      try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) throw new Error("API key is not configured.");
        const ai = new GoogleGenAI({ apiKey });

        const answersText = category.questions
          .map(q => {
            const answer = ANSWER_OPTIONS.find(opt => opt.value === answers[q.id]);
            return `- ${q.text}: ${answer ? answer.text : t('summary.report.not_answered')}`;
          })
          .join('\n');

        const prompt = t('prompts.category_insight', {
          categoryTitle: category.title,
          categoryScore: `${scoreDetails.percentage}% (${scoreDetails.label})`,
          answersText: answersText,
        });

        const response = await enqueueGenerateContent(ai, {
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        
        setInsight(response.text);
        setCachedInsight(response.text);

      } catch (e: any) {
        console.error("Error generating category insight:", e);
        if (e.message?.includes("API key not valid") || e.message?.includes("API key is not configured")) {
          setError(t('categoryModal.error.config'));
        } else if (e.toString().includes("429")) {
            setError(t('summary.error.rate_limit'));
        } else {
          setError(t('categoryModal.error.generic'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    generateInsight();
  }, [category, answers, scoreDetails, t, ANSWER_OPTIONS, cachedInsight, setCachedInsight]);

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
        style={{ animation: 'scaleIn 0.2s ease-out' }}
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 sm:p-6 border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-teal-800">{t('categoryModal.title')}: {category.title}</h2>
            <button 
              onClick={onClose} 
              className="p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
              aria-label={t('categoryModal.close_button_aria')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 space-y-6">
          <div className={`p-4 rounded-lg border-s-4 ${scoreDetails.colorClasses.bg} ${scoreDetails.colorClasses.border}`}>
            <h3 className={`text-lg font-bold ${scoreDetails.colorClasses.text}`}>{t('categoryModal.score_label')}: ${scoreDetails.label} (${scoreDetails.percentage}%)</h3>
          </div>
          
          <div className="p-4 rounded-lg border-2 border-slate-200 bg-slate-50/50 min-h-[100px] flex items-center justify-center">
              {isLoading ? (
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-slate-600">
                      <div className="w-5 h-5 border-2 border-teal-500 border-dashed rounded-full animate-spin"></div>
                      <span>{t('categoryModal.loading')}</span>
                  </div>
              ) : error ? (
                  <p className="text-red-600">{error}</p>
              ) : (
                  <p className="text-slate-700 leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: markdownToHtml(insight) }} />
              )}
          </div>
          
          <div>
            <button 
              onClick={() => setShowAnswers(!showAnswers)}
              className="w-full flex justify-between items-center text-start p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <span className="font-semibold text-slate-700">{t('categoryModal.show_answers_button')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-slate-500 transition-transform ${showAnswers ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showAnswers && (
              <div className="mt-4 p-4 border rounded-lg bg-slate-50 max-h-60 overflow-y-auto space-y-3" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                {category.questions.map(q => {
                  const answer = ANSWER_OPTIONS.find(opt => opt.value === answers[q.id]);
                  return (
                    <div key={q.id} className="text-sm">
                      <p className="font-medium text-slate-800">{q.text}</p>
                      <p className="text-teal-700 ps-2">{t('categoryModal.answer_prefix')}: {answer ? answer.text : t('summary.report.not_answered')}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
        
        <footer className="p-4 border-t border-slate-200 text-center sticky bottom-0 bg-white/80 backdrop-blur-sm">
            <button
                onClick={onClose}
                className="w-full sm:w-auto bg-teal-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
            >
                {t('categoryModal.continue_button')}
            </button>
        </footer>
      </div>
       <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>,
    document.body
  );
};

export default CategorySummaryModal;