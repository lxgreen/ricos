import React from 'react';
import { UnsupportedBlock as Component } from './component';
import type { PluginProps, DOMOutputSpec, RicosNodeExtension } from 'ricos-tiptap-types';

export const getUnsupportedNodeConfig = (name: string): RicosNodeExtension => ({
  type: 'node' as const,
  groups: [],
  Component: (props: PluginProps) => (
    <Component
      label={`'${name}' is not supported by editor. Check editor configuration.`}
      context={props.context}
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
