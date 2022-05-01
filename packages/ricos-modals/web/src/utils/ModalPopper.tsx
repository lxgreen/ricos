import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ClickOutside } from 'wix-rich-content-editor-common';
import { ModalContext } from './ModalContext';
import { Popover } from '../components/Popover';
import type { ModalConfig, TextDirection } from 'ricos-types';

type Props = {
  modalConfig: ModalConfig;
  languageDir: TextDirection;
};

export const ModalPopper = ({ modalConfig, languageDir }: Props) => {
  const { modalService } = useContext(ModalContext) || {};

  const onClickOutside = () => {
    modalService?.closeModal?.(modalConfig.id);
  };

  const ModalWrapper = modalConfig.groups?.includes('dialog') ? Popover : 'div';

  const ModalComponent = modalConfig.Component;

  return ReactDOM.createPortal(
    <ClickOutside onClickOutside={onClickOutside}>
      <div dir={languageDir}>
        <ModalWrapper modalConfig={modalConfig} dir={languageDir}>
          <ModalComponent />
        </ModalWrapper>
      </div>
    </ClickOutside>,
    document.body
  );
};
