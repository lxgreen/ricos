import React from 'react';
import { PluginsContext } from './PluginsContext';

export const withPluginsContext = WrappedComponent => {
  return function (props) {
    return (
      <PluginsContext.Consumer>
        {contexts => <WrappedComponent {...props} pluginsContext={contexts} />}
      </PluginsContext.Consumer>
    );
  };
};
