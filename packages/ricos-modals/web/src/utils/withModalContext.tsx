import React from 'react';
import { ModalContext } from './ModalContext';

export const withModalContext = WrappedComponent => {
  return function (props) {
    return (
      <ModalContext.Consumer>
        {contexts => <WrappedComponent {...props} context={contexts} />}
      </ModalContext.Consumer>
    );
  };
};
