import React from 'react';
import { UnsupportedBlock as Component } from './component';

export const getUnsupportedNodeConfig = (name: string) => ({
  type: 'node' as const,
  Component: props => (
    <Component
      label={`'${name}' is not supported by editor. Check editor configuration.`}
      {...props}
    />
  ),
  createExtensionConfig: () => ({
    name,
    priority: 100,
  }),
});
