import type { ComponentType } from 'react';
import type { KeyboardShortcut } from './shortcuts';

export type Layout = 'popover' | 'drawer' | 'dialog' | 'fullscreen';
export type Placement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end';

type ModalPositioning = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  referenceElement?: any;
  placement?: Placement;
};

export type ModalConfig = {
  Component: ComponentType;
  id: string;
  layout: Layout;
  positioning?: ModalPositioning;
  shortcuts?: KeyboardShortcut[];
};

export interface ModalService {
  openModal: (modalConfig: ModalConfig) => boolean;
  register: (modalConfig: ModalConfig) => void;
  unregister: (id: string) => void;
  closeModal: (id: string) => boolean;
  getOpenModals: () => ModalConfig[];
  onModalOpened: (onOpen: (id: string) => unknown) => void;
  onModalClosed: (onClose: (id: string) => unknown) => void;
}
