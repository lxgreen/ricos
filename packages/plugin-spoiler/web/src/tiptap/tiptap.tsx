import React from 'react';
import { BlockSpoilerComponent } from '..';

export const tiptapExtensions = [
  {
    type: 'extension' as const,
    createConfig: () => ({
      name: 'spoiler',
      priority: 10,
      addNodeViewHOC: () => ({
        nodeTypes: [],
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
