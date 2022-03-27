/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { ClickOutside } from 'wix-rich-content-editor-common';
import { getLangDir } from 'wix-rich-content-common';
import cx from 'classnames';
import styles from './CustomHeadingButton.scss';
import { DropdownArrowIcon } from '../../../icons';
import { withToolbarContext } from '../../../utils/withContext';
import HeadingsPanel from '../../../modals/heading/HeadingsPanel';
import { translateHeading, getCustomHeadingsLabel } from './utils';

const onSave = (data, selectedHeading, toolbarItem, setModalOpen) => {
  toolbarItem.commands?.removeInlineStyles();
  setTimeout(() => {
    const shouldSetBlockType = selectedHeading !== data;
    shouldSetBlockType && toolbarItem.commands?.setHeading(data);
  });
  setModalOpen(false);
};

const onChange = (documentStyle, toolbarItem, setModalOpen) => {
  toolbarItem.commands?.setAndSaveHeading(documentStyle);
  setModalOpen(false);
};

const CustomHeadingButton = ({ toolbarItem, context }) => {
  const { isMobile, t, theme, getEditorCommands, headingsData, locale } = context || {};
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

  const editorCommands = getEditorCommands?.();

  const selectedHeading = toolbarItem.attributes.selectedHeading;
  const Label = getCustomHeadingsLabel(selectedHeading, t, editorCommands);
  return (
    <ClickOutside onClickOutside={onClickOutside}>
      <div
        className={cx(styles.customHeadingModalButtonWrapper, isModalOpen ? styles.active : '')}
        ref={setReferenceElement}
      >
        <div
          dir={getLangDir(locale)}
          className={styles.customHeadingModalButton}
          role="button"
          onClick={() => setModalOpen(!isModalOpen)}
          tabIndex={0}
        >
          {Label}
          <DropdownArrowIcon />
        </div>
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <div
            dir={getLangDir(locale)}
            ref={setPopperElement}
            style={popperStyles.popper}
            {...attributes.popper}
          >
            <div data-id="toolbar-modal-button" tabIndex={-1} className={styles.modal}>
              <HeadingsPanel
                isMobile={isMobile}
                t={t}
                theme={theme}
                translateHeading={translateHeading}
                currentSelect={selectedHeading}
                documentStyle={editorCommands.getDocumentStyle()}
                customHeadings={headingsData?.customHeadings}
                allowHeadingCustomization
                currentInlineStyles={editorCommands.getInlineStylesInSelection()}
                wiredFontStyles={editorCommands.getWiredFontStyles(theme?.customStyles, isMobile)}
                onSave={({ data }) => onSave(data, selectedHeading, toolbarItem, setModalOpen)}
                onChange={documentStyle => onChange(documentStyle, toolbarItem, setModalOpen)}
                // onCancel={() => console.log('onCancel')}
              />
            </div>
          </div>,
          document.body
        )}
    </ClickOutside>
  );
};

export default withToolbarContext(CustomHeadingButton);
