import type { ModalConfig } from 'ricos-types';
import type { IModalService } from './types';

const EVENTS = {
  modalOpenEvent: 'modalOpen',
  modalCloseEvent: 'modalClose',
};

type ModalState = { state: { open?: boolean; close?: boolean } };

type IModal = ModalConfig & ModalState;

export class ModalService implements IModalService {
  private modals: IModal[] = [];

  // eslint-disable-next-line @typescript-eslint/ban-types
  private callbacks: { [key: string]: Function[] } = {};

  constructor() {
    this.modals = [];
  }

  public openModal(modalConfig) {
    const modal = this.getModal(modalConfig.id);
    if (modal) {
      modal.state = { open: true };
    } else {
      this.modals.push({ ...modalConfig, state: { open: true } });
    }
    this.emit(EVENTS.modalOpenEvent, this.getModal(modalConfig.id));
  }

  public closeModal(id) {
    const modal = this.getModal(id);
    if (modal?.state.open) {
      modal.state = { open: false };
      this.emit(EVENTS.modalCloseEvent, id);
    } else {
      console.error(`Fail to close modal: ${id} is not open`);
    }
  }

  public getOpenModals() {
    return this.modals.filter(modal => modal.state.open).map(({ state, ...rest }) => rest);
  }

  private getModal(id) {
    return this.modals.find(modal => modal.id === id);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public onModalOpened(openCallback: Function): this {
    return this.on(EVENTS.modalOpenEvent, openCallback);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public onModalClosed(closeCallback: Function): this {
    return this.on(EVENTS.modalCloseEvent, closeCallback);
  }

  //TODO: reuse EventEmitter rather duplicate code

  // eslint-disable-next-line @typescript-eslint/ban-types
  public on(event: string, fn: Function): this {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event].push(fn);

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected emit(event: string, ...args: any): this {
    const callbacks = this.callbacks[event];

    if (callbacks) {
      callbacks.forEach(callback => callback.apply(this, args));
    }

    return this;
  }
}
