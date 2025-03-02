import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import { pluginLinkButton, pluginActionButton } from 'wix-rich-content-plugin-button';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block';
import { pluginEmoji } from 'wix-rich-content-plugin-emoji';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import { pluginHashtag } from 'wix-rich-content-plugin-hashtag';
import { pluginHeadersMarkdown } from 'wix-rich-content-plugin-headers-markdown';
// import { pluginHtml } from 'wix-rich-content-plugin-html';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginLinkPreview, LinkPreviewProviders } from 'wix-rich-content-plugin-link-preview';
import { pluginMentions } from 'wix-rich-content-plugin-mentions';
import { pluginUndoRedo } from 'wix-rich-content-plugin-undo-redo';
import { pluginVideo, videoButtonsTypes } from 'wix-rich-content-plugin-video';
import { pluginAudio, audioButtonsTypes } from 'wix-rich-content-plugin-audio';
import { pluginGiphy } from 'wix-rich-content-plugin-giphy';
import { TOOLBARS, DISPLAY_MODE } from 'wix-rich-content-editor-common';

const configs = {
  giphy: {
    giphySdkApiKey: 'HXSsAGVNzjeUjhKfhhD9noF8sIbpYDsV',
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
};
const { Instagram, Twitter, TikTok } = LinkPreviewProviders;
const plugins = [
  pluginLinkButton(),
  pluginActionButton(),
  pluginCodeBlock(),
  pluginDivider(),
  pluginGallery({ scrollingElement: () => window }),
  pluginHashtag(),
  // pluginHtml(),
  pluginImage(),
  pluginHeadersMarkdown(),
  pluginLineSpacing(),
  pluginLink(),
  pluginMentions(),
  pluginVideo({
    exposeEmbedButtons: [
      videoButtonsTypes.video,
      videoButtonsTypes.youTube,
      videoButtonsTypes.soundCloud,
    ],
  }),
  pluginAudio({
    exposeEmbedButtons: [
      audioButtonsTypes.audio,
      audioButtonsTypes.soundCloud,
      audioButtonsTypes.spotify,
    ],
  }),
  pluginUndoRedo(),
  pluginEmoji(),
  pluginLinkPreview({
    exposeEmbedButtons: [Instagram, Twitter, TikTok],
    enableEmbed: true,
  }),
  pluginGiphy(configs.giphy),
];

export default () => {
  const toolbarSettings = {
    getToolbarSettings: ({ pluginButtons }) => {
      return [
        {
          name: TOOLBARS.FOOTER,
          getVisibilityFn: () => ({
            desktop: () => true,
            mobile: {
              ios: () => true,
              android: () => true,
            },
          }),
          shouldCreate: () => ({
            desktop: true,
            mobile: {
              ios: true,
              android: true,
            },
          }),
          getPositionOffset: () => ({
            desktop: { x: 0, y: 1 },
            mobile: {
              ios: { x: 0, y: 1 },
              android: { x: 0, y: 1 },
            },
          }),
          getDisplayOptions: () => ({
            desktop: { displayMode: DISPLAY_MODE.FLOATING },
            mobile: {
              ios: { displayMode: DISPLAY_MODE.FLOATING },
              android: { displayMode: DISPLAY_MODE.FLOATING },
            },
          }),
          getButtons: () => {
            const buttons = pluginButtons
              .filter(({ buttonSettings: { toolbars } }) => toolbars.includes(TOOLBARS.FOOTER))
              .map(({ component }) => component);
            return {
              desktop: buttons,
              mobile: {
                ios: buttons,
                android: buttons,
              },
            };
          },
        },
        {
          name: TOOLBARS.SIDE,
          getVisibilityFn: () => ({
            desktop: () => false,
            mobile: {
              ios: () => false,
              android: () => false,
            },
          }),
        },
        {
          name: TOOLBARS.MOBILE,
          getVisibilityFn: () => ({
            desktop: () => false,
            mobile: {
              ios: () => false,
              android: () => false,
            },
          }),
        },
        {
          name: TOOLBARS.INLINE,
          getVisibilityFn: () => ({
            desktop: () => false,
            mobile: {
              ios: () => false,
              android: () => false,
            },
          }),
        },
      ];
    },
  };

  const ricosProps = {
    plugins,
    locale: 'en',
    toolbarSettings,
    // biSettings: { consumer: 'RCE Standalone' },
    // instance: mockInstance,
  };

  return <RicosEditor {...ricosProps} />;
};
