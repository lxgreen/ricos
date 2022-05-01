import React from 'react';
import type { EditorCommands, GeneralContext, RicosTheme } from 'ricos-types';

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
        getEditorCommands,
        theme,
      }}
    >
      {React.cloneElement(React.Children.only(children))}
    </RicosContext.Provider>
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
