import type { FC } from 'react';
import React, { useContext, useState } from 'react';
import type { ModalConfig } from 'ricos-types';
import { ModalContext } from './ModalContext';
import { ModalPopper } from './ModalPopper';

export const ModalProvider: FC = ({ children }) => {
  const [openModals, setOpenModals] = useState<ModalConfig[]>([]);
  const { modalService } = useContext(ModalContext);
  const updateOpenModals = () => setOpenModals([...modalService.getOpenModals()]);
  modalService.onModalOpened(updateOpenModals);
  modalService.onModalClosed(updateOpenModals);

  return (
    <>
      {children}
      {openModals.map(modalConfig => {
        return <ModalPopper key={modalConfig.id} modalConfig={modalConfig} />;
      })}
    </>
  );
};
