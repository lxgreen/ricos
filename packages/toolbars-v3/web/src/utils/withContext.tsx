import React, { useContext } from 'react';
import { RicosContext } from 'ricos-context';
import { ToolbarContext } from './toolbarContexts';

export const withToolbarContext = WrappedComponent => {
  return props => {
    const { t } = useContext(RicosContext);
    return (
      <ToolbarContext.Consumer>
        {contexts => <WrappedComponent {...props} context={{ ...contexts, t }} />}
      </ToolbarContext.Consumer>
    );
  };
};
