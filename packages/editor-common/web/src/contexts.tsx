import React from 'react';
import type { GeneralContext, RicosTheme } from 'ricos-types';
import type { EditorCommands } from 'wix-rich-content-common';

export const RicosContext = React.createContext<GeneralContext>({
  locale: 'en',
  localeContent: 'en',
  experiments: {},
  isMobile: false,
  t: (text: string) => text,
  languageDir: 'ltr',
  theme: {} as RicosTheme,
});

export const RicosContextProvider = ({
  children,
  isMobile,
  locale,
  localeContent,
  experiments,
  languageDir,
  theme,
  t,
}) => {
  return (
    <RicosContext.Provider
      value={{
        t,
        locale,
        localeContent,
        isMobile,
        experiments,
        languageDir,
        theme,
      }}
    >
      {React.cloneElement(React.Children.only(children))}
    </RicosContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withRicosContext<T = any>() {
  return Component => {
    return (props: T) => {
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
