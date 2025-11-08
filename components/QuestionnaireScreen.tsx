import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Category, Answers } from '../types';
import QuestionItem from './QuestionItem';
import { getAnswerOptions } from '../constants';
import CategorySummaryModal from './CategorySummaryModal';
import { useTranslations } from '../hooks/useTranslations';

interface QuestionnaireScreenProps {
  category: Category;
  answers: Answers;
  onAnswerChange: (questionId: number, value: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
  currentCategoryIndex: number;
  totalCategories: number;
  skippedQuestions: Set<number>;
  onSkip: (questionId: number) => void;
  cachedInsights: { [key: string]: string };
  setCachedInsights: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({
  category,
  answers,
  onAnswerChange,
  onNext,
  onPrev,
  onFinish,
  currentCategoryIndex,
  totalCategories,
  skippedQuestions,
  onSkip,
  cachedInsights,
  setCachedInsights,
}) => {
  const [errors, setErrors] = useState<number[]>([]);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useTranslations();
  const ANSWER_OPTIONS = useMemo(() => getAnswerOptions(t), [t]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setErrors([]);
    questionRefs.current = questionRefs.current.slice(0, category.questions.length);
  }, [category.id, category.questions.length]);

  const answeredInCategory = useMemo(() => {
    return category.questions.filter(q => answers[q.id] !== undefined).length;
  }, [category.questions, answers]);

  const totalInCategory = category.questions.length;
  const categoryProgressPercentage = totalInCategory > 0 ? (answeredInCategory / totalInCategory) * 100 : 0;
  
  const isLastCategory = currentCategoryIndex === totalCategories - 1;
  const overallProgressPercentage = ((currentCategoryIndex + 1) / totalCategories) * 100;

  const handleRandomFill = () => {
    category.questions.forEach(question => {
        const randomValue = Math.floor(Math.random() * ANSWER_OPTIONS.length);
        onAnswerChange(question.id, randomValue);
    });
  };

  const validateAndProceed = (action: () => void) => {
    const unansweredIds = category.questions
      .filter(q => answers[q.id] === undefined && !skippedQuestions.has(q.id))
      .map(q => q.id);

    if (unansweredIds.length > 0) {
      setErrors(unansweredIds);
      const firstErrorId = unansweredIds[0];
      const firstErrorIndex = category.questions.findIndex(q => q.id === firstErrorId);
      if (firstErrorIndex !== -1 && questionRefs.current[firstErrorIndex]) {
        questionRefs.current[firstErrorIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setErrors([]);
      action();
    }
  };

  const handleOpenSummary = () => {
    validateAndProceed(() => {
      setIsSummaryModalOpen(true);
    });
  };

  const handleSelectAnswer = (questionId: number, value: number) => {
    onAnswerChange(questionId, value);

    setTimeout(() => {
      const currentQuestionIndex = category.questions.findIndex(q => q.id === questionId);
      const nextQuestionIndex = currentQuestionIndex + 1;

      if (nextQuestionIndex < category.questions.length) {
        const nextQuestionRef = questionRefs.current[nextQuestionIndex];
        if (nextQuestionRef) {
          nextQuestionRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 100);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
        {/* Overall Category Progress */}
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-600">{t('questionnaire.overall_progress')}</span>
                <span className="text-sm font-semibold text-slate-500">
                    {t('questionnaire.category_count', { current: currentCategoryIndex + 1, total: totalCategories })}
                </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5" role="progressbar" aria-label="Overall progress" aria-valuenow={currentCategoryIndex + 1} aria-valuemin={1} aria-valuemax={totalCategories}>
                <div
                    className="bg-teal-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${overallProgressPercentage}%` }}
                ></div>
            </div>
        </div>

        {/* Per-Category Question Progress */}
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-600">{t('questionnaire.category_progress')}</span>
                <span className="text-sm font-semibold text-slate-500">
                    {t('questionnaire.answered_count', { answered: answeredInCategory, total: totalInCategory })}
                </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5" role="progressbar" aria-label="Category progress" aria-valuenow={answeredInCategory} aria-valuemin={0} aria-valuemax={totalInCategory}>
                <div
                    className="bg-sky-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${categoryProgressPercentage}%` }}
                ></div>
            </div>
        </div>
      </div>
      
      {errors.length > 0 && (
        <div className="p-3 bg-red-100 border-s-4 border-red-500 text-red-700 rounded-md" role="alert">
            <p className="font-bold">{t('questionnaire.error_title')}</p>
            <p>{t('questionnaire.error_message')}</p>
        </div>
      )}

      <div className="space-y-8">
        {category.questions.map((question, index) => (
          <QuestionItem
            key={question.id}
            ref={el => { questionRefs.current[index] = el; }}
            question={question}
            selectedValue={answers[question.id]}
            onSelect={(value) => handleSelectAnswer(question.id, value)}
            isError={errors.includes(question.id)}
            onSkip={onSkip}
            isSkipped={skippedQuestions.has(question.id)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-slate-200">
        <button
          onClick={onPrev}
          disabled={currentCategoryIndex === 0}
          className="bg-slate-200 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {t('questionnaire.prev_button')}
        </button>
        <button
            onClick={handleRandomFill}
            className="bg-purple-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors"
        >
            {t('questionnaire.random_fill_button')}
        </button>
        <div className="flex items-center gap-x-3">
          <button
                onClick={handleOpenSummary}
                className="bg-sky-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
            >
                {t('questionnaire.interim_summary_button')}
            </button>
          {isLastCategory ? (
            <button
              onClick={() => validateAndProceed(onFinish)}
              className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              {t('questionnaire.finish_button')}
            </button>
          ) : (
            <button
              onClick={() => validateAndProceed(onNext)}
              className="bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
            >
              {t('questionnaire.next_button')}
            </button>
          )}
        </div>
      </div>
      {isSummaryModalOpen && (
        <CategorySummaryModal
            category={category}
            answers={answers}
            onClose={() => setIsSummaryModalOpen(false)}
            cachedInsight={cachedInsights[category.id]}
            setCachedInsight={(insight) => setCachedInsights(prev => ({...prev, [category.id]: insight}))}
        />
      )}
    </div>
  );
};

export default QuestionnaireScreen;