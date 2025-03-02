/* eslint-disable no-console */
import { merge } from 'lodash';
import { pluginLinkButton, pluginActionButton } from 'wix-rich-content-plugin-button';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import { pluginEmoji } from 'wix-rich-content-plugin-emoji';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import { pluginGiphy } from 'wix-rich-content-plugin-giphy';
import { pluginHashtag } from 'wix-rich-content-plugin-hashtag';
import { pluginHeadings } from 'wix-rich-content-plugin-headings';
import { pluginSpoiler } from 'wix-rich-content-plugin-spoiler';
import { pluginCollapsibleList } from 'wix-rich-content-plugin-collapsible-list';
import { pluginTable } from 'wix-rich-content-plugin-table';
import { pluginHeadersMarkdown } from 'wix-rich-content-plugin-headers-markdown';
import { pluginHtml } from 'wix-rich-content-plugin-html';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing';
import { pluginIndent } from 'wix-rich-content-plugin-indent';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginMap } from 'wix-rich-content-plugin-map';
import { pluginMentions } from 'wix-rich-content-plugin-mentions';
import { pluginUndoRedo } from 'wix-rich-content-plugin-undo-redo';
import { pluginVideo, videoButtonsTypes } from 'wix-rich-content-plugin-video';
import { pluginAudio, audioButtonsTypes } from 'wix-rich-content-plugin-audio';
import { pluginLinkPreview, LinkPreviewProviders } from 'wix-rich-content-plugin-link-preview';
import {
  pluginVerticalEmbed,
  verticalEmbedProviders,
} from 'wix-rich-content-plugin-vertical-embed';
import { mockFetchUrlPreviewData } from '../../../../../examples/storybook/src/shared/utils/linkPreviewUtil';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color';
import { pluginUnsupportedBlocks } from 'wix-rich-content-plugin-unsupported-blocks';
import { pluginPoll } from 'wix-rich-content-plugin-social-polls';

import { createPresets } from './utils';
import {
  customForegroundStyleFn,
  styleSelectionPredicate,
  colorScheme,
  customBackgroundStyleFn,
} from '../../../../../examples/main/src/text-color-style-fn';
import {
  videoHandlers,
  audioHandlers,
} from '../../../../../examples/main/shared/editor/EditorPlugins';

// eslint-disable-next-line max-len
import { MockVerticalSearchModule } from '../../../../../examples/storybook/src/shared/utils/verticalEmbedUtil';
import type { TestAppConfig } from '../../types';
import type { EditorPlugin } from 'wix-rich-content-common';

const { Instagram, Twitter, TikTok } = LinkPreviewProviders;
const { product, booking, event } = verticalEmbedProviders;

const onLinkAdd = async (customLinkData, saveData) => {
  const data = await Promise.resolve({ mockURL: 'www.sport5.co.il', mockData: {} });
  saveData(data);
};

const defaultConfigs: TestAppConfig['pluginsConfig'] = {
  fileUpload: {
    accept: '*',
  },
  giphy: {
    giphySdkApiKey: process.env.GIPHY_API_KEY || 'HXSsAGVNzjeUjhKfhhD9noF8sIbpYDsV',
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  linkPreview: {
    fetchData: mockFetchUrlPreviewData(),
    enableEmbed: true,
    exposeEmbedButtons: [Instagram, Twitter, TikTok],
  },
  verticalEmbed: {
    verticalsApi: type => new MockVerticalSearchModule(type),
    // exposeEmbedButtons: [product, event, booking],
    exposeEmbedButtons: [product, booking, event],
  },
  textHighlight: {
    colorScheme,
    styleSelectionPredicate,
    customStyleFn: customBackgroundStyleFn,
  },
  textColor: {
    colorScheme,
    styleSelectionPredicate,
    customStyleFn: customForegroundStyleFn,
  },
  video: {
    handleFileSelection: videoHandlers.handleFileSelection,
    enableCustomUploadOnMobile: true,
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`,
    exposeButtons: [videoButtonsTypes.video, videoButtonsTypes.soundCloud],
  },
  audio: {
    handleFileSelection: audioHandlers.handleFileSelection,
    fetchData: mockFetchUrlPreviewData(),
    getAudioUrl: src => `https://static.wixstatic.com/${src.id}`,
    exposeButtons: [
      audioButtonsTypes.audio,
      audioButtonsTypes.soundCloud,
      audioButtonsTypes.spotify,
    ],
  },
  gallery: {
    scrollingElement: () => window,
  },
};

const normalizeConfigs = (configs: TestAppConfig['pluginsConfig']) => {
  if (configs.link?.isCustomModal) {
    configs.link.onLinkAdd = onLinkAdd;
  }

  return configs;
};

const createPlugins = (
  externalConfigs: TestAppConfig['pluginsConfig']
): Record<string, EditorPlugin> => {
  const configs = normalizeConfigs(merge(defaultConfigs, externalConfigs));

  return {
    image: pluginImage(),
    gallery: pluginGallery(configs.gallery),
    video: pluginVideo(configs.video),
    audio: pluginAudio(configs.audio),
    html: pluginHtml(),
    divider: pluginDivider(),
    codeBlock: pluginCodeBlock(),
    link: pluginLink(configs.link),
    linkPreview: pluginLinkPreview(configs.linkPreview),
    spacing: pluginLineSpacing(),
    indent: pluginIndent(),
    hashtag: pluginHashtag(),
    mentions: pluginMentions(),
    giphy: pluginGiphy(configs.giphy),
    headers: pluginHeadersMarkdown(),
    map: pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
    fileUpload: pluginFileUpload(configs.fileUpload),
    linkButton: pluginLinkButton(),
    actionButton: pluginActionButton(),
    highlight: pluginTextHighlight(configs.textHighlight),
    textColor: pluginTextColor(configs.textColor),
    emoji: pluginEmoji(),
    undoRedo: pluginUndoRedo(),
    headings: pluginHeadings(configs.headings),
    spoiler: pluginSpoiler(),
    collapsibleList: pluginCollapsibleList(),
    table: pluginTable(),
    verticalEmbed: pluginVerticalEmbed(configs.verticalEmbed),
    unsupportedBlocks: pluginUnsupportedBlocks(),
    poll: pluginPoll(),
  };
};

export default (
  pluginsPreset: TestAppConfig['plugins'],
  externalPluginsConfigs: TestAppConfig['pluginsConfig'] = {}
): EditorPlugin[] => {
  const presets = createPresets(createPlugins(externalPluginsConfigs));

  return pluginsPreset
    ? pluginsPreset
        .map(plugin => presets[plugin])
        .flat()
        .filter(val => !!val)
    : presets.all;
};
