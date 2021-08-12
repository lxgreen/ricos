/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Styles from './styles.scss';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';

const DesktopPanel = ({
  currentSelect,
  options,
  onChange,
  showCustomPanel,
  panelHeader,
  theme,
  hasIcons,
  sizeFitContent,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const optionElement = (option, isSelected, onClick) => {
    return (
      <div
        className={classNames(styles.panel_row, {
          [styles.panel_selectedRow]: isSelected,
        })}
        key={option.commandKey}
        onClick={() => onClick(option.commandKey)}
      >
        {hasIcons ? option.icon : option.text}
      </div>
    );
  };
  return (
    <div
      className={classNames(styles.desktopPanel, {
        [styles.desktopPanel_withIcons]: hasIcons,
        [styles.desktopPanel_withCustomPanel]: showCustomPanel,
        [styles.desktopPanel_fitContent]: sizeFitContent,
      })}
    >
      {options.map(option =>
        optionElement(
          option,
          (currentSelect['line-height'] ?? currentSelect) === option.commandKey,
          onChange
        )
      )}
      {showCustomPanel && (
        <>
          <div className={styles.separator} />
          <button className={styles.showCustomPanel_button} onClick={showCustomPanel}>
            {panelHeader}
          </button>
        </>
      )}
    </div>
  );
};

export default DesktopPanel;
