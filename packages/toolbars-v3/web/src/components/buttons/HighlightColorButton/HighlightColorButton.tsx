/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { ClickOutside } from 'wix-rich-content-editor-common';
import cx from 'classnames';
import styles from './HighlightColorButton.scss';
import { withToolbarContext } from '../../../utils/withContext';
import { ColorPicker } from 'wix-rich-content-plugin-commons';
import { getLangDir } from 'wix-rich-content-common';
import { extractPalette, getBlockDocumentStyle } from './utils';
import { colorPicker } from '../TextColorButton/utils';

const onChange = (color, toolbarItem, setModalOpen) => {
  toolbarItem.commands?.setHighlightColor({ color });
  setModalOpen(false);
};

const onResetColor = (toolbarItem, setModalOpen) => {
  toolbarItem.commands?.resetHighlightColor();
  setModalOpen(false);
};

const HighlightColorButton = ({ toolbarItem, context }) => {
  const { isMobile, t, theme, locale, getEditorCommands, colorPickerData } = context || {};
  if (!context) return null;
  const [isModalOpen, setModalOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const onClickOutside = e => {
    const modalRef = popperElement;
    if (!modalRef || modalRef.contains(e.target as Node)) {
      return;
    }
    setModalOpen(false);
  };

  const settings = colorPickerData.TEXT_COLOR || {};
  const { colorScheme } = settings;
  const palette = extractPalette(colorScheme);
  const paletteColors = isMobile ? palette.slice(0, 5) : palette.slice(0, 6);

  const userColors = colorPickerData.TEXT_COLOR?.getUserColors?.();

  const onColorAdded = ({ color }) => colorPickerData.TEXT_COLOR?.onColorAdded?.(color);

  const editorCommands = getEditorCommands?.();
  const documentStyles = getBlockDocumentStyle(editorCommands);
  const currentColor =
    toolbarItem.attributes.selectedHighlightColor || documentStyles?.['background-color'];

  const Icon = toolbarItem.presentation?.icon;
  return (
    <ClickOutside onClickOutside={onClickOutside}>
      <div
        onMouseDown={e => e.preventDefault()}
        className={cx(styles.highlightColorModalButtonWrapper, {
          [styles.mobileHighlightColorModalButtonWrapper]: isMobile,
        })}
        ref={setReferenceElement}
      >
        <div
          className={cx(styles.highlightColorModalButton, {
            [styles.mobileHighlightColorModalButton]: isMobile,
          })}
          role="button"
          onClick={() => setModalOpen(!isModalOpen)}
          tabIndex={0}
        >
          <Icon className={styles.highlightColorModalButtonIcon} style={{ color: currentColor }} />
        </div>
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <div
            onMouseDown={e => e.preventDefault()}
            dir={getLangDir(locale)}
            ref={setPopperElement}
            style={isMobile ? {} : popperStyles.popper}
            {...attributes.popper}
          >
            <div data-id="toolbar-modal-button" tabIndex={-1} className={styles.modal}>
              <ColorPicker
                color={currentColor}
                palette={paletteColors}
                userColors={userColors.slice(-12)}
                onColorAdded={onColorAdded}
                theme={theme}
                isMobile={isMobile}
                onChange={({ color }) => onChange(color, toolbarItem, setModalOpen)}
                t={t}
                onResetColor={() => onResetColor(toolbarItem, setModalOpen)}
              >
                {colorPicker({ isMobile, header: t('Color_Picker_TextHighlightButton_Header') })}
              </ColorPicker>
            </div>
          </div>,
          document.body
        )}
    </ClickOutside>
  );
};

export default withToolbarContext(HighlightColorButton);
