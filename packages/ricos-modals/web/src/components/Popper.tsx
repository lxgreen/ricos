import React, { useState } from 'react';
import { ClickOutside } from 'wix-rich-content-editor-common';
import { usePopper } from 'react-popper';
import type { ReactNode } from 'react';
import type { ModalConfig } from 'ricos-types';

interface Props {
  children: ReactNode;
  modalConfig: ModalConfig;
  closeModal: () => void;
  className: string;
}

export const Popper = ({ children, modalConfig, closeModal, className }: Props) => {
  const [modalElement, setModalElement] = useState<HTMLDivElement | null>(null);

  const { referenceElement, placement } = modalConfig.positioning || {};
  const { styles: popperStyles, attributes } = usePopper(referenceElement, modalElement, {
    placement,
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
    !referenceElement.contains(e.target) && closeModal();
  };

  return (
    <ClickOutside onClickOutside={onClickOutside}>
      <div
        ref={setModalElement}
        style={popperStyles.popper}
        className={className}
        {...attributes.popper}
      >
        {children}
      </div>
    </ClickOutside>
  );
};
