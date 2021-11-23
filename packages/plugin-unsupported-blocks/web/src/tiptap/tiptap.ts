import { CreateRicosExtensions } from 'wix-tiptap-editor';
import { Component } from '../unsupported-blocks-component';

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    createExtensionConfig: name => ({
      name,
      defaultOptions,
    }),
  },
];
