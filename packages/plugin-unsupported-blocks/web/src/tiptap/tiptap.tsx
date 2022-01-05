import React from 'react';
import { UnsupportedBlock as Component } from './component';
import type { DOMOutputSpec } from 'ricos-tiptap-types';

export const getUnsupportedNodeConfig = (name: string) => ({
  type: 'node' as const,
  Component: props => (
    <Component
      label={`'${name}' is not supported by editor. Check editor configuration.`}
      {...props}
    />
  ),
  createExtensionConfig: ({ mergeAttributes }) => ({
    name,
    atom: true,
    addOptions() {
      return {
        HTMLAttributes: {},
      };
    },

    content: 'block+',

    group: 'block',

    parseHTML() {
      return [{ tag: name }];
    },

    renderHTML({ HTMLAttributes }) {
      return [
        name,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ] as DOMOutputSpec;
    },
  }),
});
