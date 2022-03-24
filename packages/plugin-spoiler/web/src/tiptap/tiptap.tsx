import React from 'react';
import type {
  CreateRicosExtensions,
  DOMOutputSpec,
  RicosExtensionConfig,
  RicosExtension,
} from 'ricos-tiptap-types';
import { BlockSpoilerComponent } from '..';
import colorDataDefaults from 'ricos-schema/dist/statics/color.defaults.json';

const SPOILER_STYLE = 'blur(0.25em)';

const SpoilerHoc = Component => {
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
    name: 'node-spoiler',
    groups: [],
    dynamicConfiguration: (config: RicosExtensionConfig, extensions: RicosExtension[]) => ({
      ...config,
      addNodeHoc: () => ({
        nodeTypes: extensions
          .filter(extension => extension.groups.includes('spoilerable'))
          .map(({ name }) => name),
        priority: 10,
        nodeHoc: SpoilerHoc,
      }),
    }),
    createExtensionConfig() {
      return {
        name: this.name,
        priority: 10,
        addOptions: () => defaultOptions,
      };
    },
  },
  {
    type: 'mark' as const,
    groups: [],
    name: 'spoiler',
    createExtensionConfig() {
      return {
        name: this.name,
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
      };
    },
  },
];
