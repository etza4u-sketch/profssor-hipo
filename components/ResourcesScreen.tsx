import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';

const ResourcesScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [thought, setThought] = useState('');
  const [alternativeThought, setAlternativeThought] = useState('');
  const [worry, setWorry] = useState('');
  const [worryPostponed, setWorryPostponed] = useState(false);
  const { t } = useTranslations();

  const handleClearJournal = () => {
    setThought('');
    setAlternativeThought('');
  };

  const handlePostponeWorry = () => {
    if (worry.trim()) {
      setWorryPostponed(true);
      setWorry('');
      setTimeout(() => setWorryPostponed(false), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-teal-800">{t('resources.title')}</h2>
        <button
          onClick={onBack}
          className="bg-slate-200 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
        >
          {t('resources.back_button')}
        </button>
      </div>

      <p className="text-slate-600">
        {t('resources.intro')}
      </p>

      <div className="p-6 rounded-lg border-2 border-slate-200 bg-slate-50/50">
        <h3 className="text-xl font-semibold text-slate-700 mb-3">{t('resources.thought_journal.title')}</h3>
        <p className="text-slate-600 mb-4 text-sm leading-relaxed">
          {t('resources.thought_journal.description')}
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="thought" className="block text-sm font-medium text-slate-700 mb-1">{t('resources.thought_journal.label1')}</label>
            <textarea
              id="thought"
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              rows={3}
              placeholder={t('resources.thought_journal.placeholder1')}
            />
          </div>
          <div>
            <label htmlFor="alternativeThought" className="block text-sm font-medium text-slate-700 mb-1">{t('resources.thought_journal.label2')}</label>
            <textarea
              id="alternativeThought"
              value={alternativeThought}
              onChange={(e) => setAlternativeThought(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              rows={3}
              placeholder={t('resources.thought_journal.placeholder2')}
            />
          </div>
          <div className="text-end">
            <button onClick={handleClearJournal} className="text-sm text-slate-500 hover:text-slate-700">{t('resources.thought_journal.clear_button')}</button>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg border-2 border-slate-200 bg-slate-50/50">
        <h3 className="text-xl font-semibold text-slate-700 mb-3">{t('resources.worry_postponement.title')}</h3>
        <p className="text-slate-600 mb-4 text-sm leading-relaxed">
          {t('resources.worry_postponement.description')}
        </p>
        <div className="space-y-4">
            <div>
                <label htmlFor="worry" className="block text-sm font-medium text-slate-700 mb-1">{t('resources.worry_postponement.label1')}</label>
                <textarea
                    id="worry"
                    value={worry}
                    onChange={(e) => setWorry(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    rows={2}
                    placeholder={t('resources.worry_postponement.placeholder1')}
                />
            </div>
            <div className="text-center">
                <button
                    onClick={handlePostponeWorry}
                    className="bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                >
                    {t('resources.worry_postponement.postpone_button')}
                </button>
            </div>
            {worryPostponed && (
                <div className="p-3 bg-green-100 border-s-4 border-green-500 text-green-700 rounded-md text-center animate-fade-in" role="alert">
                    <p>{t('resources.worry_postponement.success_message')}</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ResourcesScreen;