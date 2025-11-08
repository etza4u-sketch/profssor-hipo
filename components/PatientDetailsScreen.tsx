import React, { useState } from 'react';
import { PatientDetails } from '../types';
import { useTranslations } from '../hooks/useTranslations';

interface PatientDetailsScreenProps {
  onContinue: (details: PatientDetails) => void;
  onBack: () => void;
}

const PatientDetailsScreen: React.FC<PatientDetailsScreenProps> = ({ onContinue, onBack }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const { t } = useTranslations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({ name, phone, email });
  };

  return (
    <div className="text-center flex flex-col items-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-slate-700">{t('patientDetails.title')}</h2>
      <p className="max-w-2xl text-slate-600 leading-relaxed">
        {t('patientDetails.subtitle')}
      </p>
      <div className="w-full max-w-md text-start">
         <div className="mb-6 bg-slate-100 p-4 rounded-lg border border-slate-200">
            <p className="text-slate-600">{t('patientDetails.therapist_name_label')}</p>
            <p className="text-lg font-bold text-teal-700">{t('patientDetails.therapist_name')}</p>
         </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">{t('patientDetails.name_label')}</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-500 focus:shadow-inner transition-all duration-200 ease-in-out"
              placeholder={t('patientDetails.name_placeholder')}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">{t('patientDetails.phone_label')}</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-500 focus:shadow-inner transition-all duration-200 ease-in-out"
              placeholder="050-1234567"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">{t('patientDetails.email_label')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-500 focus:shadow-inner transition-all duration-200 ease-in-out"
              placeholder="israel@example.com"
            />
          </div>
          <div className="flex justify-between items-center pt-4">
             <button
                type="button"
                onClick={onBack}
                className="bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
             >
                {t('patientDetails.back_button')}
             </button>
             <button
                type="submit"
                className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105"
             >
                {t('patientDetails.continue_button')}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientDetailsScreen;