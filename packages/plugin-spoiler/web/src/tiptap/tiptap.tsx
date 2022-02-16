import React from 'react';
import type { CreateRicosExtensions, DOMOutputSpec } from 'ricos-tiptap-types';
import { BlockSpoilerComponent } from '..';
import colorDataDefaults from 'ricos-schema/dist/statics/color.defaults.json';

const SPOILER_STYLE = 'blur(0.25em)';

const SpoilerHoc = Component => {
  // should use the new api containerData
  const Spoiler = props => {
    const { context, componentData } = props;
    const { isMobile, theme, t } = context;
    if (componentData?.containerData?.spoiler?.enabled) {
      return (
        <BlockSpoilerComponent
          theme={theme}
          isMobile={isMobile}
          isEditableText
          t={t}
          pluginType="Image"
          handleDescriptionChange={() => {}}
          setInPluginEditingMode={() => {}}
          handleButtonContentChange={() => {}}
        >
          <Component {...props} />
        </BlockSpoilerComponent>
      );
    } else {
      return <Component {...props} />;
    }
  };
  Spoiler.displayName = 'SpoilerHoc';
  return Spoiler;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    spoiler: {
      /**
       * Set a spoiler mark
       */
      toggleSpoiler: () => ReturnType;
    };
  }
}

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'extension' as const,
    groups: ['react'],
    createExtensionConfig: () => ({
      name: 'node-spoiler',
      priority: 10,
      addOptions: () => defaultOptions,
      addNodeHoc: () => ({
        nodeTypes: ['image'],
        priority: 10,
        nodeHoc: SpoilerHoc,
      }),
    }),
  },
  {
    type: 'mark' as const,
    groups: [],
    createExtensionConfig: () => ({
      name: 'spoiler',

      addOptions: () => ({
        HTMLAttributes: {},
      }),

      addAttributes() {
        return colorDataDefaults;
      },

      parseHTML() {
        return [
          {
            tag: 'span',
            getAttrs: element => {
              const { filter } = (element as HTMLElement).style || {};
              return filter === SPOILER_STYLE ? {} : false;
            },
          },
        ];
      },

      renderHTML() {
        return ['span', { style: `filter: ${SPOILER_STYLE}` }, 0] as DOMOutputSpec;
      },

      addCommands() {
        return {
          toggleSpoiler:
            () =>
            ({ commands }) => {
              return commands.toggleMark('spoiler');
            },
        };
      },
    }),
  },
];
