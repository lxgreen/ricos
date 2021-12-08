import { Component } from '../unsupported-blocks-component';

export const getUnsupportedNodeConfig = (name: string) => ({
  type: 'node' as const,
  Component,
  createExtensionConfig: () => ({
    name,
    priority: 100,
  }),
});
