import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from './ModalContext';
import { Popover } from '../components/Popover';
import { Drawer } from '../components/Drawer';
import { Fullscreen } from '../components/Fullscreen';
import { Dialog } from '../components/Dialog';
import type { ModalConfig, TextDirection } from 'ricos-types';

type Props = {
  modalConfig: ModalConfig;
  languageDir: TextDirection;
};

const layoutMapper = {
  popover: Popover,
  drawer: Drawer,
  fullscreen: Fullscreen,
  dialog: Dialog,
};

export const ModalPopper = ({ modalConfig, languageDir }: Props) => {
  const { modalService } = useContext(ModalContext) || {};

  const closeModal = () => {
    modalService?.closeModal?.(modalConfig.id);
  };

  let ModalLayout;

  modalConfig.groups.forEach(group => layoutMapper[group] && (ModalLayout = layoutMapper[group]));

  const ModalComponent = modalConfig.Component;

  return ReactDOM.createPortal(
    <div dir={languageDir}>
      <ModalLayout closeModal={closeModal} modalConfig={modalConfig}>
        <ModalComponent />
      </ModalLayout>
    </div>,
    document.body
  );
};
