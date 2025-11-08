import { useLanguage } from '../i18n/LanguageContext';
import { getTranslationFunction } from '../i18n/translations';

export const useTranslations = () => {
  const { language } = useLanguage();
  const t = getTranslationFunction(language);
  return { t, language };
};
