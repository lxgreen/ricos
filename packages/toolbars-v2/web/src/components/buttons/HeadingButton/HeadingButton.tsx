/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { ClickOutside } from 'wix-rich-content-editor-common';
import { getLangDir } from 'wix-rich-content-common';
import cx from 'classnames';
import styles from './HeadingButton.scss';
import { DropdownArrowIcon } from '../../../icons';
import { withToolbarContext } from '../../../utils/withContext';
import HeadingsPanel from '../../../modals/heading/HeadingsPanel';
import { headingsMap, translateHeading } from './utils';

const onSave = (data, selectedHeading, toolbarItem, setModalOpen) => {
  toolbarItem.commands?.removeInlineStyles();
  const shouldSetBlockType = selectedHeading !== data;
  shouldSetBlockType && toolbarItem.commands?.setHeading(data);
  setModalOpen(false);
};

const HeadingButton = ({ toolbarItem, context }) => {
  const { isMobile, t, theme, headingsData, locale } = context || {};
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

  const selectedHeading = toolbarItem.attributes.selectedHeading;
  const Label = translateHeading(headingsMap[selectedHeading], t);
  return (
    <ClickOutside onClickOutside={onClickOutside}>
      <div
        className={cx(styles.headingModalButtonWrapper, isModalOpen ? styles.active : '')}
        ref={setReferenceElement}
      >
        <div
          className={styles.headingModalButton}
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
                customHeadings={headingsData?.customHeadings}
                allowHeadingCustomization={false}
                onSave={({ data }) => onSave(data, selectedHeading, toolbarItem, setModalOpen)}
              />
            </div>
          </div>,
          document.body
        )}
    </ClickOutside>
  );
};

export default withToolbarContext(HeadingButton);
