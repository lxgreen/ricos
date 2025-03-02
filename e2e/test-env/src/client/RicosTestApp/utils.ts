import type { EditorPlugin, ViewerPlugin } from 'wix-rich-content-common';

export const createPresets = <T extends EditorPlugin | ViewerPlugin>(
  plugins: Record<string, T>
) => {
  const partialPreset = [
    plugins.image,
    plugins.gallery,
    plugins.video,
    plugins.audio,
    plugins.html,
    plugins.divider,
    plugins.spacing,
    plugins.link,
    plugins.hashtag,
    plugins.mentions,
    plugins.codeBlock,
    plugins.giphy,
    plugins.headers,
    plugins.map,
    plugins.fileUpload,
    plugins.linkButton,
    plugins.textColor,
    plugins.emoji,
    plugins.highlight,
    plugins.undoRedo,
    plugins.unsupportedBlocks,
  ].filter(val => !!val); //non-mutual plugins such as undoRedo
  return {
    all: Object.values(plugins),
    partialPreset,
    embedsPreset: [plugins.link, plugins.linkPreview, plugins.verticalEmbed],
    spoilerPreset: [plugins.link, plugins.spoiler, plugins.image, plugins.gallery, plugins.video],
    textPlugins: [
      plugins.linkPreview,
      plugins.verticalEmbed,
      plugins.indent,
      plugins.actionButton,
      ...partialPreset,
    ],
    ...plugins,
  };
};
