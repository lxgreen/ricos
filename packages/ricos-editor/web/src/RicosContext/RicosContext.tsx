import React, { useEffect, useState } from 'react';
import { fetchLocaleResource } from './translations';
import { RicosTranslate } from 'wix-rich-content-common';
import type { TranslationFunction } from 'wix-rich-content-common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RicosContextFields = {
  locale: string;
  localeContent: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  experiments: Record<string, any>;
  isMobile: boolean;
  t: TranslationFunction;
};

export interface IRicosContext {
  ricosContext: RicosContextFields;
}

const RicosContext = React.createContext<RicosContextFields>(null as unknown as RicosContextFields);

export const RicosContextProvider = ({
  children,
  isMobile,
  locale,
  localeContent,
  experiments,
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
          }}
        >
          {React.cloneElement(React.Children.only(children))}
        </RicosContext.Provider>
      )}
    </RicosTranslate>
  );
};

export function withRicosContext<T>() {
  return Component => {
    return (props: T) => {
      return (
        <RicosContext.Consumer>
          {(value: RicosContextFields) => <Component {...props} ricosContext={value} />}
        </RicosContext.Consumer>
      );
    };
  };
}

export const RicosContextConsumer = ({ children }) => {
  return (
    <RicosContext.Consumer>{(value: RicosContextFields) => children(value)}</RicosContext.Consumer>
  );
};
