import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translationEN.json";
import translationAR from "./locales/ar/translationAR.json";

// const whitespace = document.getElementById('root');

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      ar: {
        translation: translationAR,
      },
    },
    // fallbackLng: "en",
    // lng: "en",

    interpolation: {
      escapeValue: false,
    },

    useLocalStorage: true,
    useDataAttrOptions: true,
    debug: true,


    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    },
  });

 
export default i18n;
