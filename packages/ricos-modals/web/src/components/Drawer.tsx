/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import type { ReactNode } from 'react';
import type { ModalConfig, TextDirection } from 'ricos-types';
import styles from '../../statics/styles/drawer.scss';

interface Props {
  children: ReactNode;
  modalConfig: ModalConfig;
  dir: TextDirection;
  closeModal: () => void;
}

export const Drawer = ({ children, closeModal }: Props) => {
  const onModalClick = e => e.stopPropagation();
  const onOverlayClick = () => closeModal();

  return (
    <div onClick={onOverlayClick} className={styles.overlay}>
      <div onClick={onModalClick} className={styles.content}>
        {children}
      </div>
    </div>
  );
};
