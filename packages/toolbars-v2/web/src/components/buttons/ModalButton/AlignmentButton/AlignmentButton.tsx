/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { ClickOutside } from 'wix-rich-content-editor-common';
import cx from 'classnames';
import type { ToolbarItemProps } from '../../../../types';
import styles from './AlignmentButton.scss';
import {
  AlignLeftIcon,
  AlignTextCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  DropdownArrowIcon,
} from '../../../../icons';

const defaultAlignment = 'left'; // TODO: check with isRtl / getLangDir when we have context

const alignmentMap = {
  left: AlignLeftIcon,
  center: AlignTextCenterIcon,
  right: AlignRightIcon,
  justify: AlignJustifyIcon,
};

export const AlignmentButton = ({ toolbarItem }: ToolbarItemProps) => {
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

  const selectedAlignment = toolbarItem.attributes.selectedAlignment || defaultAlignment;
  const SelectedAlignmentIcon = alignmentMap[`${selectedAlignment}`];
  return (
    <ClickOutside onClickOutside={onClickOutside}>
      <div
        className={cx(styles.alignmentModalButtonWrapper, isModalOpen ? styles.active : '')}
        ref={setReferenceElement}
      >
        <div
          className={styles.alignmentModalButton}
          role="button"
          onClick={() => setModalOpen(!isModalOpen)}
          tabIndex={0}
        >
          <SelectedAlignmentIcon />
          <DropdownArrowIcon />
        </div>
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <div dir="" ref={setPopperElement} style={popperStyles.popper} {...attributes.popper}>
            <div className={styles.alignmentModalWrapper}>
              {Object.keys(alignmentMap).map((alignment, i) => {
                const OptionIcon = alignmentMap[`${alignment}`];
                return (
                  <div
                    key={i}
                    className={cx(styles.alignmentModalOptionButton, {
                      [styles.alignmentModalOptionButton_active]: selectedAlignment === alignment,
                    })}
                    onClick={() => toolbarItem.commands?.selectOption(alignment)}
                  >
                    <OptionIcon />
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
