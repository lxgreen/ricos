import type { ModalConfig, ModalService } from 'ricos-types';

const EVENTS = {
  modalOpenEvent: 'modalOpen',
  modalCloseEvent: 'modalClose',
};

type IModal = ModalConfig;

export class RicosModalService implements ModalService {
  private modals: IModal[] = [];

  private callbacks: { [key: string]: ((id: string) => unknown)[] } = {};

  constructor() {
    this.modals = [];
  }

  public register(modalConfig: ModalConfig) {}

  public unregister(id: string) {}

  public openModal(modalConfig: ModalConfig) {
    const modal = this.getModal(modalConfig.id);
    if (modal) {
      console.error(`Attempt to open ${modalConfig.id} that's already open`);
      return false;
    } else {
      this.modals.push(modalConfig);
      this.emit(EVENTS.modalOpenEvent, this.getModal(modalConfig.id));
      return true;
    }
  }

  public closeModal(id: string) {
    const modal = this.getModal(id);
    if (modal) {
      this.modals = this.modals.filter(modal => modal.id !== id);
      this.emit(EVENTS.modalCloseEvent, id);
      return true;
    } else {
      console.error(`Fail to close modal: ${id} is not open`);
      return false;
    }
  }

  public getOpenModals() {
    return this.modals;
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
