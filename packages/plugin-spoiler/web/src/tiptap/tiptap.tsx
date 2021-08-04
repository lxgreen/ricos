import React from 'react';
import { BlockSpoilerComponent } from '..';
import { ExtensionBuilder } from 'wix-rich-content-editor-common';

const name = 'spoiler';

export const tiptapExtensions = new ExtensionBuilder()
  .addGeneric({
    createConfig: () => {
      return {
        name,
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
      };
    },
  })
  .build();
