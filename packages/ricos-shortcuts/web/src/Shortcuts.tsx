import type { FC, ReactChild } from 'react';
import React, { useContext } from 'react';
import { HotKeys, configure } from 'react-hotkeys';
import { RicosContext } from 'wix-rich-content-editor-common';
import { ShortcutsContext } from './ShortcutsContext';
import styles from './Shortcuts.scss';

export type ShortcutsProps = {
  group: string;
  root?: boolean;
  children: ReactChild;
};

const defaultProps = {
  group: 'global',
  root: false,
  children: null,
  plugins: [],
};

export const Shortcuts: FC<ShortcutsProps> = (props: ShortcutsProps) => {
  const { group, root, children } = { ...defaultProps, ...props };
  const { shortcuts } = useContext(ShortcutsContext);
  const { getEditorCommands, t } = useContext(RicosContext);
  const commands = getEditorCommands();
  const { handlers, keyMap } = shortcuts.getHotKeysProps(group, commands, t);
  console.log(keyMap); // eslint-disable-line no-console
  configure({ ignoreEventsCondition: () => false, ignoreTags: [] });
  return (
    <HotKeys root={root} handlers={handlers} keyMap={keyMap}>
      <div className={styles.focusable}>{children}</div>
    </HotKeys>
  );
};
