/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { ClickOutside } from 'wix-rich-content-editor-common';
import cx from 'classnames';
import type { ToolbarItemProps } from '../../../../types';
import styles from './HeadingButton.scss';
import { DropdownArrowIcon } from '../../../../icons';

const headingsMap = {
  'header-one': 'Heading 1',
  'header-two': 'Heading 2',
  'header-three': 'Heading 3',
  'header-four': 'Heading 4',
  'header-five': 'Heading 5',
  'header-six': 'Heading 6',
  unstyled: 'Paragraph',
};

export const HeadingButton = ({ toolbarItem }: ToolbarItemProps) => {
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
  const SelectedHeadingLabel = headingsMap[`${selectedHeading}`];
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
          {SelectedHeadingLabel}
          <DropdownArrowIcon />
        </div>
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <div dir="" ref={setPopperElement} style={popperStyles.popper} {...attributes.popper}>
            <div className={styles.headingModalWrapper}>
              {Object.keys(headingsMap).map((heading, i) => {
                const OptionLabel = headingsMap[`${heading}`];
                return (
                  <div
                    key={i}
                    className={cx(styles.headingModalOptionButton, {
                      [styles.headingModalOptionButton_active]:
                        toolbarItem.attributes.selectedHeading === heading,
                    })}
                    onClick={() => toolbarItem.commands?.selectOption(heading)}
                  >
                    <div className={styles.headingModalOptionLabel}>{OptionLabel}</div>
                  </div>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </ClickOutside>
  );
};
