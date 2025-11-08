import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface WelcomeScreenProps {
  onStart: () => void;
  onStartTest: () => void;
}

const PlayCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);


const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onStartTest }) => {
  const { t } = useTranslations();
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="p-4 sm:p-8 text-center bg-slate-50 rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-teal-700 mb-4">
          {t('welcome.title')}
        </h1>
        <p className="text-slate-600 mb-4 leading-relaxed">
          {t('welcome.p1')}
        </p>
        <p className="text-slate-600 mb-8 leading-relaxed">
          {t('welcome.p2')}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
                onClick={onStart}
                className="inline-flex items-center justify-center bg-teal-600 text-white font-bold text-lg py-3 px-8 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
            >
                <PlayCircleIcon />
                {t('welcome.start_button')}
            </button>
            <button
                onClick={onStartTest}
                className="inline-flex items-center justify-center bg-purple-600 text-white font-bold text-lg py-3 px-8 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
            >
                <SparklesIcon />
                {t('welcome.test_button')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;