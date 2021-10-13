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
  customPanelOptions,
  panelHeader,
  theme,
  sizeFitContent,
  t,
  externalFocus,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const osName = findOsName();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = panelRef.current as HTMLDivElement;
    !externalFocus && ref.focus();
  }, []);

  const optionElement = (option, isSelected, onClick) => {
    const content = option.icon ? option.icon : t(option.text);
    const onKeyDown = e => {
      if (e.keyCode === KEYS_CHARCODE.ENTER) {
        onClick(option.commandKey, true);
      }
    };
    return (
      <Tooltip
        content={t?.(
          option?.tooltip,
          option?.tooltipShortcut &&
            osName && {
              shortcut: option.tooltipShortcut[osName],
            }
        )}
      >
        <div
          className={styles.panel_row_container}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div
            className={classNames(styles.panel_row_desktop, {
              [styles.panel_selectedRow]: isSelected,
            })}
            key={option.commandKey}
            onClick={() => onClick(option.commandKey)}
          >
            <div className={styles.panel_row_text_container}>
              <div className={styles.panel_row_text}>{content} </div>
              {option.subText && <div className={styles.panel_row_subtext}>{option.subText}</div>}
            </div>
          </div>
          {option.modal && customPanelOptions?.openOption === option.commandKey && option.modal}
        </div>
      </Tooltip>
    );
  };

  const dropDownPanel = (
    <div
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={-1}
      ref={panelRef}
      className={classNames(styles.desktopPanel, {
        [styles.desktopPanel_fitContent]: sizeFitContent,
      })}
    >
      {options.map(option =>
        optionElement(
          option,
          (currentSelect['line-height'] ?? currentSelect) === option.commandKey,
          customPanelOptions?.inline ? customPanelOptions.onOpen : onChange
        )
      )}
      {customPanelOptions && !customPanelOptions.inline && (
        <>
          <div className={styles.separator} />
          <button className={styles.showCustomPanel_button} onClick={customPanelOptions.onOpen}>
            {panelHeader}
          </button>
        </>
      )}
    </div>
  );
  return externalFocus ? dropDownPanel : <FocusManager>{dropDownPanel}</FocusManager>;
};

export default DesktopPanel;
