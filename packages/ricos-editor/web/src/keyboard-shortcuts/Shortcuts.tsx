import type { FC, ReactChild } from 'react';
import React, { useContext } from 'react';
import { HotKeys } from 'react-hotkeys';
import { ShortcutsContext } from './ShortcutsContext';
import { RicosContext } from 'wix-rich-content-editor-common';

export type ShortcutsProps = {
  group: string;
  root: boolean;
  children: ReactChild;
};

const defaultProps = {
  group: 'global',
  root: false,
  children: null,
};

export const Shortcuts: FC<ShortcutsProps> = (props: ShortcutsProps) => {
  const { group, root, children } = { ...defaultProps, ...props };
  const { shortcuts } = useContext(ShortcutsContext);
  const { getEditorCommands } = useContext(RicosContext);
  const commands = getEditorCommands();
  const { handlers, keyMap } = shortcuts.getHotKeysProps(group, commands);
  return (
    <HotKeys root={root} handlers={handlers} keyMap={keyMap}>
      {children}
    </HotKeys>
  );
};
