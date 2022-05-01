import type { ModalConfig } from 'ricos-types';

export interface ModalContextValue {
  modalService: ModalService;
}

export interface ModalService {
  openModal: (modalConfig: ModalConfig) => void;
  closeModal: (id: string) => void;
  getOpenModals: () => ModalConfig[];
  onModalOpened: (onOpen: (id: string) => unknown) => void;
  onModalClosed: (onClose: (id: string) => unknown) => void;
}
