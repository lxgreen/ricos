import type { ComponentType } from 'react';
import React, { Component } from 'react';
import { getDisplayName } from 'wix-rich-content-common';

export default (EmbeddedComponent: ComponentType, props?: Record<string, unknown>): ComponentType =>
  class extends Component {
    static displayName = `Decorated(${getDisplayName(EmbeddedComponent)})`;

    render() {
      return <EmbeddedComponent {...this.props} {...props} />;
    }
  };
