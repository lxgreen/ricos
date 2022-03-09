import React from 'react';
import { ToolbarContext } from './toolbarContexts';

export const withToolbarContext = WrappedComponent => {
  return function (props) {
    return (
      <ToolbarContext.Consumer>
        {contexts => <WrappedComponent {...props} context={contexts} />}
      </ToolbarContext.Consumer>
    );
  };
};
