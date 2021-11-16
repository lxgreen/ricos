/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Styles from './customPanelStyles.scss';
import { mergeStyles } from 'wix-rich-content-common';
import { InfoIcon } from 'wix-rich-content-ui-components';
import classNames from 'classnames';
import { KEYS_CHARCODE } from 'wix-rich-content-editor-common';

const onKeyDown = (e, onClick, clickFromKeyBoard?: boolean) => {
  if (e.keyCode === KEYS_CHARCODE.ENTER) {
    e.preventDefault();
    clickFromKeyBoard ? onClick(true) : onClick();
  }
};

const UpdateHeadingPanel = ({
  optionName,
  theme,
  onApply,
  onUpdate,
  onReset,
  t,
  resetEnabled,
  updateEnabled,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const updateButtonDisabled = !updateEnabled();
  return (
    <div className={styles.panel}>
      <button
        className={classNames(styles.panel_row, styles.buttonComponent)}
        onClick={() => onApply(false)}
        onKeyDown={e => onKeyDown(e, onApply, true)}
      >
        {t('FormattingToolbar_TextStyle_Heading_Apply', { optionName })}
      </button>
      <div className={styles.separator} />
      <div className={styles.panel_row}>
        <button
          className={styles.buttonComponent}
          onClick={() => onUpdate()}
          onKeyDown={e => onKeyDown(e, onUpdate)}
          disabled={updateButtonDisabled}
        >
          {t('FormattingToolbar_TextStyle_Heading_Update', { optionName })}
        </button>
        <InfoIcon
          tooltipText={t('FormattingToolbar_TextStyle_Update_Heading_Tooltip')}
          size={{ height: 16, width: 16 }}
          iconStyles={updateButtonDisabled ? styles.disabled_icon : undefined}
        />
      </div>
      <button
        className={classNames(styles.panel_row, styles.buttonComponent)}
        onClick={() => onReset()}
        onKeyDown={e => onKeyDown(e, onReset)}
        disabled={!resetEnabled()}
      >
        {t('FormattingToolbar_TextStyle_Heading_Reset')}
      </button>
    </div>
  );
};

export default UpdateHeadingPanel;
