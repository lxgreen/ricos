import React from 'react';
import type { EditorCommands } from 'wix-rich-content-common';
type EditorContextValue = {
  getEditorCommands: () => EditorCommands;
};
export const EditorCommandsContext = React.createContext<EditorContextValue>({
  getEditorCommands: () => null as unknown as EditorCommands,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withEditorCommands<T = any>() {
  return Component => {
    return (props: T) => {
      return (
        <EditorCommandsContext.Consumer>
          {(value: EditorContextValue) => {
            return <Component {...props} getEditorCommands={value} />;
          }}
        </EditorCommandsContext.Consumer>
      );
    };
  };
}
