import React from 'react';
import { UnsupportedBlock as Component } from './component';
import type { PluginProps, DOMOutputSpec, RicosNodeExtension } from 'ricos-tiptap-types';

export const getUnsupportedNodeConfig = ({
  unsupportedNodeType,
  ...attrs
}): RicosNodeExtension => ({
  type: 'node' as const,
  groups: ['react'],
  Component: (props: PluginProps) => (
    <Component
      label={`'${unsupportedNodeType}' is not supported by editor. Check editor configuration.`}
      context={props.context}
    />
  ),
  name: unsupportedNodeType,
  createExtensionConfig: ({ mergeAttributes }) => ({
    name: unsupportedNodeType,
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
      return [{ tag: unsupportedNodeType }];
    },

    renderHTML({ HTMLAttributes }) {
      return [
        unsupportedNodeType,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ] as DOMOutputSpec;
    },
  }),
});
