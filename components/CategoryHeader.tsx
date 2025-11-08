import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import { useTranslations } from '../hooks/useTranslations';

interface CategoryHeaderProps {
  category: Category;
}

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category }) => {
  const [showExplanation, setShowExplanation] = useState(true);
  const { t } = useTranslations();

  // When category changes, show the explanation for the new category
  useEffect(() => {
    setShowExplanation(true);
  }, [category.id]);

  return (
    <>
      {showExplanation && (
        <div className="mb-6 p-4 bg-teal-50 border-s-4 border-teal-500 rounded-md relative animate-fade-in">
          <button
            onClick={() => setShowExplanation(false)}
            className="absolute top-2 end-2 p-1 text-teal-600 rounded-full hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
            aria-label={t('categoryHeader.close_button_aria')}
          >
            <XIcon className="h-5 w-5" />
          </button>
          <div className="flex items-start">
            <InfoIcon className="h-6 w-6 text-teal-500 me-3 flex-shrink-0 mt-1" />
            <div className="text-start">
              <h3 className="font-semibold text-teal-800">{t('categoryHeader.title')}</h3>
              <p className="text-teal-900 leading-relaxed">{category.explanation}</p>
            </div>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-bold text-teal-800 text-center mb-6 pb-4 border-b border-slate-200">
        {category.title}
      </h2>
    </>
  );
};

export default CategoryHeader;