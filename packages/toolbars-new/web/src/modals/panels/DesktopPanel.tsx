/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import Styles from './styles.scss';
import { mergeStyles } from 'wix-rich-content-common';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import classNames from 'classnames';
import { findOsName } from '../../Toolbar/buttonsListCreatorConsts';
import { KEYS_CHARCODE } from 'wix-rich-content-editor-common';
import { FocusManager } from 'wix-rich-content-ui-components';

const DesktopPanel = ({
  currentSelect,
  options,
  onChange,
  showCustomPanel,
  panelHeader,
  theme,
  hasIcons,
  t,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const osName = findOsName();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = panelRef.current as HTMLDivElement;
    ref.focus();
  }, []);

  const optionElement = (option, isSelected, onClick) => {
    const onKeyDown = e => {
      if (e.keyCode === KEYS_CHARCODE.ENTER) {
        onClick(option.commandKey, true);
      }
    };
    const content = hasIcons ? option.icon() : t(option.text);
    return (
      <Tooltip
        content={t(
          option?.tooltip,
          option?.tooltipShortcut &&
            osName && {
              shortcut: option.tooltipShortcut[osName],
            }
        )}
      >
        <div
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onKeyDown={onKeyDown}
          className={classNames(styles.panel_row, {
            [styles.panel_selectedRow]: isSelected,
          })}
          key={option.commandKey}
          onClick={() => onClick(option.commandKey)}
        >
          {content}
        </div>
      </Tooltip>
    );
  };
  return (
    <FocusManager>
      <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={-1}
        ref={panelRef}
        className={classNames(styles.desktopPanel, {
          [styles.desktopPanel_withIcons]: hasIcons,
          [styles.desktopPanel_withCustomPanel]: showCustomPanel,
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
    </FocusManager>
  );
};

export default DesktopPanel;
