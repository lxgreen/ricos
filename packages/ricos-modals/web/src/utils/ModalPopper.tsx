import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { ClickOutside } from 'wix-rich-content-editor-common';
import { ModalContext } from './ModalContext';

export const ModalPopper = ({ Component, referenceElement, id, languageDir, groups }) => {
  const { ModalService } = useContext(ModalContext) || {};

  const [modalElement, setModalElement] = useState<HTMLDivElement | null>(null);

  const onClickOutside = () => {
    ModalService?.closeModal?.(id);
  };

  const { styles: popperStyles, attributes } = usePopper(referenceElement, modalElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  //TODO: create wrapper for each modal group (include styles, position, etc)
  const getModalStyles = groups => {
    let styles = {};
    if (groups?.includes('dialog')) {
      styles = {
        backgroundColor: 'white',
        padding: 20,
        border: '1px solid rgba(51, 51, 51, 0.1)',
        borderRadius: 2,
        zIndex: 20001,
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.06)',
      };
    }
    return styles;
  };

  return ReactDOM.createPortal(
    <ClickOutside onClickOutside={onClickOutside}>
      <div
        dir={languageDir}
        ref={setModalElement}
        style={{ ...popperStyles.popper, ...getModalStyles(groups) }}
        {...attributes.popper}
      >
        <Component />
      </div>
    </ClickOutside>,
    document.body
  );
};
