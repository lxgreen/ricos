import React, { useState } from 'react';
import { ClickOutside } from 'wix-rich-content-editor-common';
import { usePopper } from 'react-popper';
import type { ReactNode } from 'react';
import type { ModalConfig, TextDirection } from 'ricos-types';
import styles from '../../statics/styles/popover.scss';

interface Props {
  children: ReactNode;
  modalConfig: ModalConfig;
  dir: TextDirection;
  closeModal: () => void;
}

export const Popover = ({ children, modalConfig, dir, closeModal }: Props) => {
  const [modalElement, setModalElement] = useState<HTMLDivElement | null>(null);

  const { referenceElement } = modalConfig.positioning || {};
  const { styles: popperStyles, attributes } = usePopper(referenceElement, modalElement, {
    placement: dir === 'ltr' ? 'right-start' : 'left-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  return (
    <ClickOutside onClickOutside={closeModal}>
      <div
        dir={dir}
        ref={setModalElement}
        style={popperStyles.popper}
        className={styles.popover}
        {...attributes.popper}
      >
        {children}
      </div>
    </ClickOutside>
  );
};
