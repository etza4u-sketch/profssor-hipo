import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslations } from '../hooks/useTranslations';

const HomePage: React.FC = () => {
  const { t } = useTranslations();

  return (
    <div className="pb-16">
      <section 
        className="relative w-full h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{backgroundImage: "url('/1000146824.png')"}}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">{t('home.hero.title')}</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-shadow">
            {t('home.hero.subtitle')}
          </p>
          <Link to="/questionnaire" className="bg-teal-500 text-white py-3 px-8 text-lg rounded-lg font-bold hover:bg-teal-600 transition-colors shadow-lg transform hover:scale-105">
            {t('home.hero.cta')}
          </Link>
        </div>
      </section>

      <section className="py-16 px-8 text-center max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">{t('home.feature.title')}</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
         {t('home.feature.subtitle')}
        </p>
      </section>
    </div>
  );
};

export default HomePage;