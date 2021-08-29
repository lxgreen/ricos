/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Styles from './customPanelStyles.scss';
import { mergeStyles } from 'wix-rich-content-common';

const UpdateHeadingPanel = ({ optionName, theme, onApply, onUpdate, onReset, t }) => {
  const styles = mergeStyles({ styles: Styles, theme });
  return (
    <div className={styles.panel}>
      <div className={styles.panel_row} onClick={() => onApply()}>
        {t('FormattingToolbar_TextStyle_Heading_Apply', { optionName })}
      </div>
      <div className={styles.separator} />
      <div className={styles.panel_row} onClick={() => onUpdate()}>
        {t('FormattingToolbar_TextStyle_Heading_Update', { optionName })}
      </div>
      <div className={styles.panel_row} onClick={() => onReset()}>
        {t('FormattingToolbar_TextStyle_Heading_Reset')}
      </div>
    </div>
  );
};

export default UpdateHeadingPanel;
