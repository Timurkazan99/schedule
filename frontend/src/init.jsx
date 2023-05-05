import React from 'react';
import i18next from "i18next";
import resources from './locales';
import {I18nextProvider, initReactI18next} from "react-i18next";
import App from "./App.jsx";

const Init = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      lng: 'ru',
      resources,
      debug: true,
      react: {
        useSuspense: false,
      },
    });

  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

export default Init;