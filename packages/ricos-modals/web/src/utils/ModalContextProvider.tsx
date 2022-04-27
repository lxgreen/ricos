import React, { PureComponent } from 'react';
import { ModalPopper } from './ModalPopper';
import { ModalContext } from './ModalContext';
import type { ModalContextValue } from '../types';
import type { ModalConfig } from 'ricos-types';

export class ModalContextProvider extends PureComponent<ModalContextValue> {
  state: { openModals: ModalConfig[] };

  constructor(props) {
    super(props);
    const { ModalService } = props;
    ModalService.onModalOpened(this.updateOpenModals);
    ModalService.onModalClosed(this.updateOpenModals);

    this.state = {
      openModals: [],
    };
  }

  updateOpenModals = () => this.setState({ openModals: this.props.ModalService?.getOpenModals() });

  render() {
    const { children, ...context } = this.props;

    return (
      <ModalContext.Provider value={context}>
        {children}
        {this.state.openModals.map(({ id, Component, groups, positioning = {} }) => {
          return (
            <ModalPopper
              key={id}
              modalComponent={Component}
              referenceElement={positioning.referenceElement}
              groups={groups}
              modalId={id}
              languageDir={context.languageDir}
            />
          );
        })}
      </ModalContext.Provider>
    );
  }
}
