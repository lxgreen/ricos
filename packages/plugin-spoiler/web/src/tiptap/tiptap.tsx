import React from 'react';
import { CreateRicosExtensions } from 'wix-rich-content-common';
import { BlockSpoilerComponent } from '..';

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'extension' as const,
    createExtensionConfig: () => ({
      name: 'spoiler',
      priority: 10,
      defaultOptions,
      addNodeViewHOC: () => ({
        nodeTypes: ['image'],
        nodeViewHOC: Component => {
          // should use the new api containerData
          return props => {
            const { context, componentData } = props;
            const { isMobile, theme, t } = context;
            if (componentData?.config?.spoiler) {
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
        },
      }),
    }),
  },
];
