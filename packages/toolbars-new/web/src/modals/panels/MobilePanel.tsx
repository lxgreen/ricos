/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import classNames from 'classnames';
import { CloseIcon } from 'wix-rich-content-ui-components';
import styles from './styles.scss';

const Separator = () => <div className={styles.separator} />;

const MobilePanel = ({ currentSelect, panelHeader, onChange, onCancel, options, hasIcons }) => {
  const lineHeightElement = (option, isSelected, showSeparator) => {
    return (
      <div>
        <div
          className={classNames(styles.panel_row, {
            [styles.panel_selectedRow]: isSelected,
          })}
          key={option.commandKey}
          onClick={e => {
            e.stopPropagation();
            onChange(option.commandKey);
          }}
        >
          <div
            className={
              hasIcons ? styles.mobile_contentWrapper_withIcon : styles.mobile_contentWrapper
            }
          >
            {hasIcons && <div>{option.icon}</div>}
            <div>{option.text}</div>
          </div>
        </div>
        {showSeparator && <Separator />}
      </div>
    );
  };

  return (
    <div className={styles.mobilePanel}>
      <div className={styles.mobilePanel_header}>
        {panelHeader}
        <CloseIcon className={styles.closeIcon} onClick={onCancel} />
      </div>
      <Separator />
      <div className={styles.mobilePanel_rows}>
        {options.map((option, i) => {
          const isSelected = (currentSelect['line-height'] ?? currentSelect) === option.commandKey;
          const showSeparator = i !== options.length - 1;
          return lineHeightElement(option, isSelected, showSeparator);
        })}
      </div>
    </div>
  );
};

export default MobilePanel;
