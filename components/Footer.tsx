import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const Footer: React.FC = () => {
  const { t } = useTranslations();
  return (
    <footer className="text-center p-6 bg-slate-800 text-white mt-8">
      <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
    </footer>
  );
};

export default Footer;