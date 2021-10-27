import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import undoIcon from './icons/UndoIcon';
import { InlineToolbarButton, undo, FORMATTING_BUTTONS } from 'wix-rich-content-editor-common';
import { UNDO_REDO_TYPE } from './types';
import {
  RichContentTheme,
  Helpers,
  SetEditorState,
  GetEditorState,
} from 'wix-rich-content-common/src';
import { TranslationFunction } from 'i18next';

interface UndoButtonProps {
  theme?: RichContentTheme;
  helpers?: Helpers;
  setEditorState: SetEditorState;
  isMobile?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any;
  tabIndex?: number;
  t: TranslationFunction;
  getEditorState: GetEditorState;
}

const UndoButton: FunctionComponent<UndoButtonProps> = props => {
  const {
    isMobile,
    theme = {},
    helpers,
    children,
    className,
    config,
    tabIndex,
    t,
    getEditorState,
    setEditorState,
  } = props;
  const editorState = getEditorState();
  const combinedClassName = classNames(theme.undo, className);
  const icon = config?.toolbar?.icons?.Undo || undoIcon;
  const disabled = editorState?.getUndoStack()?.isEmpty?.() || !editorState;

  const onClick = event => {
    event.stopPropagation();
    setEditorState(undo(getEditorState()));
  };

  if (isMobile)
    return (
      <InlineToolbarButton
        disabled={disabled}
        onClick={onClick}
        isActive={false}
        helpers={helpers}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('UndoButton_Tooltip')}
        dataHook={'undoButton'}
        formattingButtonName={FORMATTING_BUTTONS.UNDO}
        tabIndex={tabIndex}
        pluginType={UNDO_REDO_TYPE}
        icon={icon}
      >
        {children}
      </InlineToolbarButton>
    );
  else
    return (
      <button
        tabIndex={tabIndex}
        disabled={disabled}
        onClick={onClick}
        className={combinedClassName}
      >
        {children}
      </button>
    );
};

export default UndoButton;
