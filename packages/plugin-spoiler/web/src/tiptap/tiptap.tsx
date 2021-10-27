import React from 'react';
import { CreateRicosExtensions } from 'wix-tiptap-editor';
import { BlockSpoilerComponent } from '..';

const SpoilerHoc = Component => {
  // should use the new api containerData
  const Spoiler = props => {
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
  Spoiler.displayName = 'SpoilerHoc';
  return Spoiler;
};

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'extension' as const,
    createExtensionConfig: () => ({
      name: 'spoiler',
      priority: 10,
      defaultOptions,
      addNodeHoc: () => ({
        nodeTypes: ['image'],
        priority: 10,
        nodeHoc: SpoilerHoc,
      }),
    }),
  },
];
