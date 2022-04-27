import React from 'react';
import { ModalService } from '../src/ModalService';

describe('Modal Service', () => {
  const modalService = new ModalService();
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
});
