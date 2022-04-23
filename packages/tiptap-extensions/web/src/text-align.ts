import type { RicosExtension, RicosExtensionConfig } from 'ricos-tiptap-types';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textAlign: {
      /**
       * Set the text align attribute
       */
      setTextAlign: (alignment: string) => ReturnType;
      unsetTextAlign: () => ReturnType;
    };
  }
}

export const createTextAlign = (): RicosExtension => ({
  type: 'extension' as const,
  groups: [],
  name: 'textAlign',
  dynamicConfiguration(config: RicosExtensionConfig, extensions: RicosExtension[]) {
    const types = extensions
      .filter(extension => extension.groups.includes('text-container'))
      .map(({ name }) => name);
    return {
      ...config,
      addGlobalAttributes() {
        return [
          {
            types,
            attributes: {
              textStyle: {
                parseHTML: element => element.style.textAlign,
                renderHTML: attributes => {
                  if (
                    attributes?.textStyle?.textAlignment &&
                    attributes?.textStyle?.textAlignment !== 'AUTO'
                  ) {
                    return {
                      style: `text-align: ${attributes.textStyle.textAlignment.toLowerCase()}`,
                    };
                  }
                  const textAlignmentDefault = this.options.textAlignment || 'unset';
                  return {
                    style: `text-align: ${textAlignmentDefault.toLowerCase()}`,
                  };
                },
              },
            },
          },
        ];
      },
      addCommands() {
        return {
          setTextAlign:
            (alignment: string) =>
            ({ commands }) => {
              if (!this.options.alignments.includes(alignment)) {
                return false;
              }

              return types
                .map(type =>
                  commands.updateAttributes(type, {
                    textStyle: { textAlignment: alignment.toUpperCase() },
                  })
                )
                .includes(true);
            },
          unsetTextAlign: () => () => {
            console.error('unsetTextAlign : was not implemented');
            return false;
          },
        };
      },
    };
  },
  createExtensionConfig() {
    return {
      name: this.name,
      addOptions() {
        return {
          alignments: ['left', 'center', 'right', 'justify'],
          textAlignment: '',
        };
      },

      addKeyboardShortcuts() {
        return {
          'Mod-Shift-l': () => this.editor.commands.setTextAlign('left'),
          'Mod-Shift-e': () => this.editor.commands.setTextAlign('center'),
          'Mod-Shift-r': () => this.editor.commands.setTextAlign('right'),
          'Mod-Shift-j': () => this.editor.commands.setTextAlign('justify'),
        };
      },
    };
  },
});
