import React, { useEffect, useState } from 'react';
import { fetchLocaleResource } from './translations';
import { RicosTranslate } from 'wix-rich-content-common';
import type { RicosTheme, EditorCommands, GeneralContext, TranslationFunction } from 'ricos-types';

export const RicosContext = React.createContext<GeneralContext>({
  locale: 'en',
  localeContent: 'en',
  experiments: {},
  isMobile: false,
  t: (text: string) => text,
  languageDir: 'ltr',
  getEditorCommands: () => ({} as EditorCommands),
  theme: {} as RicosTheme,
});

export const RicosContextProvider = ({
  children,
  isMobile,
  locale,
  localeContent,
  experiments,
  languageDir,
  getEditorCommands,
  theme,
}) => {
  const [currentLocaleResource, setLocaleResource] = useState<{
    locale: string;
    localeResource?: Record<string, string>;
  }>(
    null as unknown as {
      locale: string;
      localeResource?: Record<string, string>;
    }
  );

  // custom hook
  useEffect(() => {
    const hanldeLocaleResource = async () => {
      const localeResource = await fetchLocaleResource(locale);
      setLocaleResource(localeResource);
    };

    hanldeLocaleResource();
  }, []);

  if (!currentLocaleResource) {
    return <div />;
  }
  return (
    <RicosTranslate
      locale={currentLocaleResource.locale}
      localeResource={currentLocaleResource.localeResource}
    >
      {(t: TranslationFunction) => (
        <RicosContext.Provider
          value={{
            t,
            locale: currentLocaleResource.locale,
            localeContent,
            isMobile,
            experiments,
            languageDir,
            getEditorCommands,
            theme,
          }}
        >
          {React.cloneElement(React.Children.only(children))}
        </RicosContext.Provider>
      )}
    </RicosTranslate>
  );
};

export function withRicosContext() {
  return Component => {
    return props => {
      return (
        <RicosContext.Consumer>
          {(value: GeneralContext) => <Component {...props} ricosContext={value} />}
        </RicosContext.Consumer>
      );
    };
  };
}

export const RicosContextConsumer = ({ children }) => {
  return (
    <RicosContext.Consumer>{(value: GeneralContext) => children(value)}</RicosContext.Consumer>
  );
};
