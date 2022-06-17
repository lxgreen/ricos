import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from './ModalContext';
import { RicosContext } from 'ricos-context';
import { Popover } from '../components/Popover';
import { Drawer } from '../components/Drawer';
import { Fullscreen } from '../components/Fullscreen';
import { Dialog } from '../components/Dialog';
import { Toolbar } from '../components/Toolbar';
import type { ModalConfig } from 'ricos-types';

type Props = {
  modalConfig: ModalConfig;
};

const layoutMapper = {
  popover: Popover,
  drawer: Drawer,
  fullscreen: Fullscreen,
  dialog: Dialog,
  toolbar: Toolbar,
};

export const ModalPopper = ({ modalConfig }: Props) => {
  const { modalService } = useContext(ModalContext) || {};
  const { languageDir, portal } = useContext(RicosContext);

  const closeModal = () => {
    modalService?.closeModal?.(modalConfig.id);
  };

  const ModalLayout = layoutMapper[modalConfig.layout];

  const ModalComponent = modalConfig.Component;

  return ReactDOM.createPortal(
    <div dir={languageDir}>
      <ModalLayout closeModal={closeModal} modalConfig={modalConfig}>
        <ModalComponent />
      </ModalLayout>
    </div>,
    portal
  );
};
