import type { ModalConfig } from 'ricos-types';

export interface ModalContextValue {
  modalService: ModalService;
}

export interface ModalService {
  openModal: (modalConfig: ModalConfig) => boolean;
  closeModal: (id: string) => boolean;
  getOpenModals: () => ModalConfig[];
  onModalOpened: (onOpen: (id: string) => unknown) => void;
  onModalClosed: (onClose: (id: string) => unknown) => void;
}
