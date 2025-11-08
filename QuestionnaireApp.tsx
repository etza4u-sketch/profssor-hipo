import React, { useState, useCallback, useMemo } from 'react';
import { AppState, Answers, PatientDetails } from './types';
import { getCategories, getAnswerOptions } from './constants';
import WelcomeScreen from './components/WelcomeScreen';
import PatientDetailsScreen from './components/PatientDetailsScreen';
import QuestionnaireScreen from './components/QuestionnaireScreen';
import SummaryScreen from './components/SummaryScreen';
import ResourcesScreen from './components/ResourcesScreen';
import CategoryHeader from './components/CategoryHeader';
import { useTranslations } from './hooks/useTranslations';

const QuestionnaireApp: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({ name: '', phone: '', email: '' });
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [skippedQuestions, setSkippedQuestions] = useState<Set<number>>(new Set());
  const [cachedInsights, setCachedInsights] = useState<{ [key: string]: string }>({});
  const [cachedFinalSummary, setCachedFinalSummary] = useState<string>('');
  const { t, language } = useTranslations();

  const CATEGORIES = useMemo(() => getCategories(t), [t]);
  const ANSWER_OPTIONS = useMemo(() => getAnswerOptions(t), [t]);

  const handleStart = useCallback(() => {
    setAppState('patientDetails');
    setCurrentCategoryIndex(0);
    setAnswers({});
    setSkippedQuestions(new Set());
    setCachedInsights({});
    setCachedFinalSummary('');
  }, []);

  const handleStartTest = useCallback(() => {
    setPatientDetails({ name: 'System Tester', phone: '050-0000000', email: 'tester@example.com' });

    const allQuestions = CATEGORIES.flatMap(category => category.questions);
    const randomAnswers: Answers = {};
    allQuestions.forEach(question => {
      const randomValue = Math.floor(Math.random() * ANSWER_OPTIONS.length);
      randomAnswers[question.id] = randomValue;
    });

    setAnswers(randomAnswers);
    setSkippedQuestions(new Set());
    setAppState('summary');
  }, [CATEGORIES, ANSWER_OPTIONS]);


  const handleBackToWelcome = useCallback(() => {
    setAppState('welcome');
  }, []);

  const handleContinueToQuestionnaire = useCallback((details: PatientDetails) => {
    setPatientDetails(details);
    setAppState('questionnaire');
  }, []);

  const handleAnswerChange = useCallback((questionId: number, value: number) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value,
    }));
    setSkippedQuestions(prevSkipped => {
      if (prevSkipped.has(questionId)) {
        const newSkipped = new Set(prevSkipped);
        newSkipped.delete(questionId);
        return newSkipped;
      }
      return prevSkipped;
    });
  }, []);

  const handleSkipQuestion = useCallback((questionId: number) => {
    setAnswers(prevAnswers => {
        if (prevAnswers[questionId] !== undefined) {
            const {[questionId]: _, ...rest} = prevAnswers;
            return rest;
        }
        return prevAnswers;
    });
    setSkippedQuestions(prevSkipped => {
        const newSkipped = new Set(prevSkipped);
        newSkipped.add(questionId);
        return newSkipped;
    });
  }, []);

  const handleNextCategory = useCallback(() => {
    if (currentCategoryIndex < CATEGORIES.length - 1) {
      setCurrentCategoryIndex(prevIndex => prevIndex + 1);
    }
  }, [currentCategoryIndex, CATEGORIES]);

  const handlePrevCategory = useCallback(() => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(prevIndex => prevIndex - 1);
    }
  }, [currentCategoryIndex]);

  const handleFinish = useCallback(() => {
    setAppState('summary');
  }, []);

  const handleNavigateToResources = useCallback(() => {
    setAppState('resources');
  }, []);

  const handleBackToSummary = useCallback(() => {
    setAppState('summary');
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} onStartTest={handleStartTest} />;
      case 'patientDetails':
        return <PatientDetailsScreen onContinue={handleContinueToQuestionnaire} onBack={handleBackToWelcome} />;
      case 'questionnaire':
        return (
          <div>
            <CategoryHeader category={CATEGORIES[currentCategoryIndex]} />
            <QuestionnaireScreen
              category={CATEGORIES[currentCategoryIndex]}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              onNext={handleNextCategory}
              onPrev={handlePrevCategory}
              onFinish={handleFinish}
              currentCategoryIndex={currentCategoryIndex}
              totalCategories={CATEGORIES.length}
              skippedQuestions={skippedQuestions}
              onSkip={handleSkipQuestion}
              cachedInsights={cachedInsights}
              setCachedInsights={setCachedInsights}
            />
          </div>
        );
      case 'summary':
        return <SummaryScreen 
                    answers={answers} 
                    categories={CATEGORIES} 
                    onStartOver={handleStart} 
                    patientDetails={patientDetails} 
                    onNavigateToResources={handleNavigateToResources}
                    cachedSummary={cachedFinalSummary}
                    setCachedSummary={setCachedFinalSummary}
                />;
      case 'resources':
        return <ResourcesScreen onBack={handleBackToSummary} />;
      default:
        return <WelcomeScreen onStart={handleStart} onStartTest={handleStartTest} />;
    }
  };

  return (
    <div className="relative isolate" key={language}>
        <div 
            aria-hidden="true"
            className="fixed inset-0 bg-cover bg-center z-[-1]" 
            style={{backgroundImage: "url('/1000146824.png')"}} 
        />
        <div aria-hidden="true" className="fixed inset-0 bg-slate-900/60 z-[-1]"></div>

        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>{t('questionnaireApp.title')}</h1>
                <p className="text-slate-200 mt-2 text-lg" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>{t('questionnaireApp.subtitle')}</p>
            </header>
            <main className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-200/50 min-h-[50vh]">
                {renderContent()}
            </main>
            <footer className="text-center mt-8 text-sm text-slate-300">
                <p>{t('questionnaireApp.footer')}</p>
            </footer>
        </div>
    </div>
  );
};

export default QuestionnaireApp;