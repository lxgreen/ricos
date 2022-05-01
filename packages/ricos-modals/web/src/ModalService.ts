import type { ModalConfig } from 'ricos-types';
import type { ModalService } from './types';

const EVENTS = {
  modalOpenEvent: 'modalOpen',
  modalCloseEvent: 'modalClose',
};

type ModalState = { state: { open?: boolean; close?: boolean } };

type IModal = ModalConfig & ModalState;

export class RicosModalService implements ModalService {
  private modals: IModal[] = [];

  private callbacks: { [key: string]: ((id: string) => unknown)[] } = {};

  constructor() {
    this.modals = [];
  }

  public openModal(modalConfig: ModalConfig) {
    const modal = this.getModal(modalConfig.id);
    if (modal) {
      modal.state = { open: true };
    } else {
      this.modals.push({ ...modalConfig, state: { open: true } });
    }
    this.emit(EVENTS.modalOpenEvent, this.getModal(modalConfig.id));
  }

  public closeModal(id: string) {
    const modal = this.getModal(id);
    if (modal?.state.open) {
      modal.state = { open: false };
      this.emit(EVENTS.modalCloseEvent, id);
    } else {
      console.error(`Fail to close modal: ${id} is not open`);
    }
  }

  // TODO: separate Modal entity and ModalConfig type
  public getOpenModals() {
    return this.modals.filter(modal => modal.state.open).map(({ state: _, ...rest }) => rest);
  }

  private getModal(id: string) {
    return this.modals.find(modal => modal.id === id);
  }

  public onModalOpened(onOpen: (id: string) => unknown) {
    this.on(EVENTS.modalOpenEvent, onOpen);
  }

  public onModalClosed(onClose: (id: string) => unknown) {
    this.on(EVENTS.modalCloseEvent, onClose);
  }

  //TODO: reuse EventEmitter rather duplicate code

  public on(event: string, fn: (id: string) => unknown): this {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event].push(fn);

    return this;
  }

  protected emit(event: string, ...args: unknown[]): this {
    const callbacks = this.callbacks[event];

    if (callbacks) {
      callbacks.forEach(callback => callback.apply(this, args));
    }

    return this;
  }
}
