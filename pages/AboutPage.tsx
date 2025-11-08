import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslations } from '../hooks/useTranslations';

const AboutPage: React.FC = () => {
  const { t } = useTranslations();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-teal-800 mb-6">{t('about.title')}</h2>
        
        <p className="text-center text-lg text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
          {t('about.intro')}
        </p>

        <div className="space-y-8 text-slate-700 leading-loose">
            <div>
                <h3 className="text-2xl font-semibold text-teal-700 mb-3 pb-2 border-b-2 border-teal-100">{t('about.section1.title')}</h3>
                <p>
                    {t('about.section1.p1')}
                </p>
                <p>
                    {t('about.section1.p2')}
                </p>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-teal-700 mb-3 pb-2 border-b-2 border-teal-100">{t('about.section2.title')}</h3>
                <p>
                    {t('about.section2.p1')}
                </p>
                <p>
                    {t('about.section2.p2')}
                </p>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-teal-700 mb-3 pb-2 border-b-2 border-teal-100">{t('about.section3.title')}</h3>
                <p>
                    {t('about.section3.p1')}
                </p>
                <p>
                    {t('about.section3.p2')}
                </p>
            </div>
        </div>

        <div className="text-center mt-12">
            <Link to="/questionnaire" className="bg-teal-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg">
            {t('about.cta')}
            </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;