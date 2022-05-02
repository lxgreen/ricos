import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from './ModalContext';
import { Popover } from '../components/Popover';
import { Drawer } from '../components/Drawer';
import type { ModalConfig, TextDirection } from 'ricos-types';

type Props = {
  modalConfig: ModalConfig;
  languageDir: TextDirection;
};

export const ModalPopper = ({ modalConfig, languageDir }: Props) => {
  const { modalService } = useContext(ModalContext) || {};

  const closeModal = () => {
    modalService?.closeModal?.(modalConfig.id);
  };

  const ModalWrapper = modalConfig.groups.includes('popover')
    ? Popover
    : modalConfig.groups.includes('drawer')
    ? Drawer
    : 'div';

  const ModalComponent = modalConfig.Component;

  return ReactDOM.createPortal(
    <div dir={languageDir}>
      <ModalWrapper closeModal={closeModal} modalConfig={modalConfig} dir={languageDir}>
        <ModalComponent />
      </ModalWrapper>
    </div>,
    document.body
  );
};
