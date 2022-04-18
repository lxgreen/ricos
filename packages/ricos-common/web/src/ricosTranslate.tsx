import React, { useEffect, useState, useRef } from 'react';
import { I18nextProvider, I18n as I18nReact } from 'react-i18next';
import i18n from './i18n';

const RicosTranslate = ({ children, locale, localeResource }) => {
  const i18nInstance = useRef(i18n({ locale, localeResource }));
  const [forceCounter, forceUpdate] = React.useState(0);
  useEffect(() => {
    useState;
    i18nInstance.current.addResourceBundle(locale, 'translation', localeResource);
    i18nInstance.current.changeLanguage(locale, err => {
      if (!err) {
        forceUpdate(forceCounter + 1);
      }
    });
  }, [locale, localeResource]);
  return (
    <I18nextProvider i18n={i18nInstance.current}>
      <I18nReact i18n={i18nInstance.current} wait initialLanguage={locale}>
        {t => {
          return children(t);
        }}
      </I18nReact>
    </I18nextProvider>
  );
};

export { RicosTranslate };
