import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../public/locales/en/translation.json';
import translationSV from '../public/locales/sv/translation.json';

// === Get language from the localStrorage ===
const savedLanguage =
  typeof window !== 'undefined' ? localStorage.getItem('language') : null;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    sv: {
      translation: translationSV,
    },
  },
  lng: savedLanguage ?? 'en',
  fallbackLng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
