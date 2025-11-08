import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';

const Header: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslations();

  const getLinkClass = (path: string) => {
    const baseClasses = "py-2 px-5 rounded-full font-semibold transition-all duration-200 ease-in-out text-center";
    if (location.pathname === path) {
      return `${baseClasses} bg-teal-600 text-white shadow-md`;
    }
    return `${baseClasses} text-slate-600 bg-slate-100 hover:bg-teal-100 hover:text-teal-800`;
  };

  const getLangButtonClass = (lang: 'he' | 'en') => {
    const baseClasses = "py-1 px-4 rounded-md font-semibold text-sm transition-colors";
    if (language === lang) {
        return `${baseClasses} bg-teal-600 text-white`;
    }
    return `${baseClasses} bg-slate-200 text-slate-600 hover:bg-slate-300`;
  };


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto p-4 sm:px-8">
        <div className="text-xl sm:text-2xl font-bold text-slate-800">
            <Link to="/">{t('header.title')}</Link>
        </div>
        <div className="flex items-center gap-x-8">
          <div className="hidden sm:flex items-center gap-x-3 sm:gap-x-4">
            <Link to="/" className={getLinkClass('/')}>{t('header.home')}</Link>
            <Link to="/treatment-method" className={getLinkClass('/treatment-method')}>{t('header.treatmentMethod')}</Link>
            <Link to="/about" className={getLinkClass('/about')}>{t('header.about')}</Link>
            <Link to="/questionnaire" className={getLinkClass('/questionnaire')}>{t('header.app')}</Link>
          </div>
          <div className="flex items-center p-1 bg-slate-100 rounded-lg">
              <button onClick={() => setLanguage('en')} className={getLangButtonClass('en')}>EN</button>
              <button onClick={() => setLanguage('he')} className={getLangButtonClass('he')}>HE</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;