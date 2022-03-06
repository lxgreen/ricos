import React from 'react';
import { UnsupportedBlock as Component } from './component';
import type { PluginProps, DOMOutputSpec, RicosNodeExtension } from 'ricos-tiptap-types';

export const getUnsupportedNodeConfig = ({ type, ...attrs }): RicosNodeExtension => ({
  type: 'node' as const,
  groups: ['react'],
  Component: (props: PluginProps) => (
    <Component
      label={`'${type}' is not supported by editor. Check editor configuration.`}
      context={props.context}
    />
  ),
  createExtensionConfig: ({ mergeAttributes }) => ({
    name: type,
    atom: true,
    addOptions() {
      return {
        HTMLAttributes: {},
      };
    },

    getAttributes: () => attrs,

    content: 'block+',

    group: 'block',

    parseHTML() {
      return [{ tag: type }];
    },

    renderHTML({ HTMLAttributes }) {
      return [
        type,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ] as DOMOutputSpec;
    },
  }),
});
