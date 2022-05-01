import React, { useState } from 'react';
import type { ReactNode } from 'react';
import styles from '../../statics/styles/popover.scss';
import { usePopper } from 'react-popper';
import type { ModalConfig, TextDirection } from 'ricos-types';

interface Props {
  children: ReactNode;
  modalConfig: ModalConfig;
  dir: TextDirection;
}

export const Popover = ({ children, modalConfig, dir }: Props) => {
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
    <div
      dir={dir}
      ref={setModalElement}
      style={popperStyles.popper}
      className={styles.popover}
      {...attributes.popper}
    >
      {children}
    </div>
  );
};
