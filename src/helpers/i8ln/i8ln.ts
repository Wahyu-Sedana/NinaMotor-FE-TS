import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: {},
    },
    zh: {
      translation: {},
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
