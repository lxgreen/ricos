import React from 'react';
import { RicosModalService } from '../src/ModalService';

describe('Modal Service', () => {
  const modalService = new RicosModalService();
  const openCallback = jest.fn(() => {});
  const closeCallback = jest.fn(() => {});

  modalService.onModalOpened(openCallback);
  modalService.onModalClosed(closeCallback);

  const Component = <div>Mock modal component</div>;
  const id = 'mockModalId';

  it('should open modal', () => {
    modalService.openModal({ Component, id });

    expect(openCallback).toBeCalledTimes(1);

    expect(modalService.getOpenModals()).toHaveLength(1);

    expect(JSON.stringify(modalService.getOpenModals())).toEqual(
      JSON.stringify([
        {
          Component,
          id,
        },
      ])
    );
  });

  it('should close modal', () => {
    modalService.closeModal(id);
    expect(closeCallback).toBeCalledTimes(1);

    expect(modalService.getOpenModals()).toHaveLength(0);
  });

  it('should open multiple modals', () => {
    modalService.openModal({ Component, id });
    modalService.openModal({ Component: <div />, id: 'mockModalId2' });
    expect(modalService.getOpenModals()).toHaveLength(2);
  });

  it('should not open modal which is already open', () => {
    expect(modalService.openModal({ Component, id })).toBe(false);
  });

  it('should not close modal which is not open', () => {
    expect(modalService.closeModal({ Component: <div />, id: 'notExistModal' })).toBe(false);
  });
});
