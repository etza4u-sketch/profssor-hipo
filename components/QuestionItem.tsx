import React, { useMemo } from 'react';
import { Question } from '../types';
import { getAnswerOptions } from '../constants';
import { useTranslations } from '../hooks/useTranslations';

interface QuestionItemProps {
  question: Question;
  selectedValue: number | undefined;
  onSelect: (value: number) => void;
  isError: boolean;
  onSkip: (questionId: number) => void;
  isSkipped: boolean;
}

const CheckIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 me-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const QuestionItem = React.forwardRef<HTMLDivElement, QuestionItemProps>(
  ({ question, selectedValue, onSelect, isError, onSkip, isSkipped }, ref) => {
    const { t } = useTranslations();
    const ANSWER_OPTIONS = useMemo(() => getAnswerOptions(t), [t]);

    return (
      <div ref={ref} className={`p-4 rounded-lg border-2 bg-slate-50/50 transition-all duration-300 ${isError ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200'}`}>
        <p className="mb-4 text-lg text-slate-800 font-medium">
          {question.id}. {question.text}
        </p>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start items-center">
          {ANSWER_OPTIONS.map((option) => {
            const isSelected = selectedValue === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onSelect(option.value)}
                className={`inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 border-2 ${
                  isSelected
                    ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:border-slate-400'
                }`}
              >
                {isSelected && <CheckIcon />}
                {option.text}
              </button>
            );
          })}
           <button
            onClick={() => onSkip(question.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 border-2 ms-auto ${
              isSkipped
                ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100 hover:border-slate-400'
            }`}
            aria-label={`Skip question ${question.id}`}
          >
            {t('questionItem.skip')}
          </button>
        </div>
      </div>
    );
  }
);

QuestionItem.displayName = 'QuestionItem';

export default QuestionItem;