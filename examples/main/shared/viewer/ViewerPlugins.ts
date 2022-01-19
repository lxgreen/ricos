import theme from '../theme/theme';
import {
  videoTypeMapper,
  VIDEO_TYPE,
  pluginVideo,
} from 'wix-rich-content-plugin-video/loadable/viewer';
import {
  dividerTypeMapper,
  pluginDivider,
  DIVIDER_TYPE,
} from 'wix-rich-content-plugin-divider/viewer';
import { htmlTypeMapper, pluginHtml, HTML_TYPE } from 'wix-rich-content-plugin-html/viewer';
import { soundCloudTypeMapper, pluginSoundCloud } from 'wix-rich-content-plugin-sound-cloud/viewer';
import { linkTypeMapper, LINK_TYPE, pluginLink } from 'wix-rich-content-plugin-link/viewer';
import {
  linkPreviewTypeMapper,
  LINK_PREVIEW_TYPE,
  pluginLinkPreview,
} from 'wix-rich-content-plugin-link-preview/viewer';
import {
  imageTypeMapper,
  pluginImage,
  IMAGE_TYPE,
} from 'wix-rich-content-plugin-image/loadable/viewer';
import { tableTypeMapper, pluginTable, TABLE_TYPE } from 'wix-rich-content-plugin-table/viewer';

import {
  galleryTypeMapper,
  pluginGallery,
  GALLERY_TYPE,
} from 'wix-rich-content-plugin-gallery/loadable/viewer';
import { mapTypeMapper, pluginMap, MAP_TYPE } from 'wix-rich-content-plugin-map/viewer';
import { giphyTypeMapper, pluginGiphy, GIPHY_TYPE } from 'wix-rich-content-plugin-giphy/viewer';
import {
  buttonTypeMapper,
  pluginActionButton,
  ACTION_BUTTON_TYPE,
} from 'wix-rich-content-plugin-button/viewer';
import { HashtagDecorator, pluginHashtag } from 'wix-rich-content-plugin-hashtag/viewer';
import {
  verticalEmbedTypeMapper,
  pluginVerticalEmbed,
  VERTICAL_EMBED_TYPE,
} from 'wix-rich-content-plugin-vertical-embed/viewer';
import {
  createHeadersMarkdownDecorator,
  HEADERS_MARKDOWN_TYPE,
  pluginHeadersMarkdown,
} from 'wix-rich-content-plugin-headers-markdown';
import {
  CodeBlockDecorator,
  pluginCodeBlock,
  CODE_BLOCK_TYPE,
} from 'wix-rich-content-plugin-code-block/viewer';
import {
  mentionsTypeMapper,
  MENTION_TYPE,
  pluginMentions,
} from 'wix-rich-content-plugin-mentions/viewer';
import {
  fileUploadTypeMapper,
  pluginFileUpload,
  FILE_UPLOAD_TYPE,
} from 'wix-rich-content-plugin-file-upload/loadable/viewer';
import {
  textColorInlineStyleMapper,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  textHighlightInlineStyleMapper,
  pluginTextColor,
  pluginTextHighlight,
} from 'wix-rich-content-plugin-text-color/viewer';
import {
  spoilerInlineStyleMapper,
  initSpoilersContentState,
  SpoilerViewerWrapper,
  SPOILER_TYPE,
  pluginSpoiler,
} from 'wix-rich-content-plugin-spoiler/viewer';
import {
  collapsibleListTypeMapper,
  pluginCollapsibleList,
  COLLAPSIBLE_LIST_TYPE,
} from 'wix-rich-content-plugin-collapsible-list/viewer';

import {
  viewerCustomForegroundStyleFn,
  styleSelectionPredicate,
  viewerCustomBackgroundStyleFn,
} from '../../src/text-color-style-fn';

import { pollTypeMapper, pluginPoll, POLL_TYPE } from 'wix-rich-content-plugin-social-polls/viewer';
import { SocialPollsServiceMock } from '../../src/Components/SocialPollsServiceMock/SocialPollsServiceMock';

import type { RichContentViewerProps } from 'wix-rich-content-viewer';
import type {
  Decorator,
  PluginTypeMapper,
  DraftContent,
  UISettings,
  ViewerPluginCreator,
} from 'wix-rich-content-common';
import { HASHTAG_TYPE, ViewerPlugin } from 'wix-rich-content-common';

const linkPluginSettings = {
  // eslint-disable-next-line no-console
  onClick: (event, url) => console.log('link clicked!', url),
  siteUrl: 'http://localhost:3000/', //siteUrl is for anchor SEO
};
const mentionsPluginSettings = {
  // eslint-disable-next-line no-console
  onMentionClick: mention => console.log('mention clicked!', mention),
  getMentionLink: () => '/link/to/mention',
};

export const typeMappers: PluginTypeMapper[] = [
  videoTypeMapper,
  buttonTypeMapper,
  dividerTypeMapper,
  htmlTypeMapper,
  linkTypeMapper,
  linkPreviewTypeMapper,
  soundCloudTypeMapper,
  mentionsTypeMapper,
  imageTypeMapper,
  tableTypeMapper,
  galleryTypeMapper,
  mapTypeMapper,
  fileUploadTypeMapper,
  giphyTypeMapper,
  pollTypeMapper,
  verticalEmbedTypeMapper,
  collapsibleListTypeMapper,
];

export const uiSettings: UISettings = {
  // disableRightClick: true, deprecated
};

const config: RichContentViewerProps['config'] = {
  [POLL_TYPE]: {
    pollServiceApi: new SocialPollsServiceMock(),
    getSiteMembers: () => [
      // Public user
      {
        siteMemberId: 'd0d683f9-81b1-4ec2-84ee-7f49c5245148',
        name: { nick: 'User 1' },
        imageUrl: 'https://static.wixstatic.com/media/436483e6ed9e41fe91b9f286d2ea4efb.jpg',
      },
      // Private user
      {
        siteMemberId: 'd0d683f9-81b1-4ec2-84ee-7f49c5245149',
      },
    ],
  },
  [GALLERY_TYPE]: {},
  [SPOILER_TYPE]: { initSpoilersContentState, SpoilerViewerWrapper },
  [HEADERS_MARKDOWN_TYPE]: {
    hideMarkdown: true,
  },
  [GIPHY_TYPE]: {
    giphySdkApiKey: process.env.GIPHY_API_KEY,
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  // [HTML_TYPE]: {
  // siteDomain="https://www.wix.com"
  // },
  [LINK_TYPE]: linkPluginSettings,
  [LINK_PREVIEW_TYPE]: {
    enableEmbed: true,
  },
  [MENTION_TYPE]: mentionsPluginSettings,
  [TEXT_HIGHLIGHT_TYPE]: {
    styleSelectionPredicate,
    customStyleFn: viewerCustomBackgroundStyleFn,
  },
  [TEXT_COLOR_TYPE]: {
    styleSelectionPredicate,
    customStyleFn: viewerCustomForegroundStyleFn,
  },
  [FILE_UPLOAD_TYPE]: {
    resolveFileUrl: () =>
      new Promise(resolve =>
        setTimeout(
          () => resolve('https://www.w3.org/wai/er/tests/xhtml/testfiles/resources/pdf/dummy.pdf'),
          1000
        )
      ),
    downloadTarget: '_blank',
  },
  [VIDEO_TYPE]: {
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`,
  },
  uiSettings,
  [ACTION_BUTTON_TYPE]: {
    onClick: () => {
      // eslint-disable-next-line no-alert
      window.alert('onClick event..');
    },
  },
  [HASHTAG_TYPE]: {
    onClick: (event, text) => {
      event.preventDefault();
      // eslint-disable-next-line no-console
      console.log(`'${text}' hashtag clicked!`);
    },
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
  },
};

export const ricosViewerPlugins: Record<string, ViewerPluginCreator<unknown>> = {
  [IMAGE_TYPE]: pluginImage,
  [GALLERY_TYPE]: pluginGallery,
  [VIDEO_TYPE]: pluginVideo,
  [HTML_TYPE]: pluginHtml,
  [DIVIDER_TYPE]: pluginDivider,
  [LINK_TYPE]: pluginLink,
  [HASHTAG_TYPE]: pluginHashtag,
  [MENTION_TYPE]: pluginMentions,
  [CODE_BLOCK_TYPE]: pluginCodeBlock,
  [GIPHY_TYPE]: pluginGiphy,
  [HEADERS_MARKDOWN_TYPE]: pluginHeadersMarkdown,
  [MAP_TYPE]: pluginMap,
  [FILE_UPLOAD_TYPE]: pluginFileUpload,
  [TEXT_COLOR_TYPE]: pluginTextColor,
  [TEXT_HIGHLIGHT_TYPE]: pluginTextHighlight,
  [LINK_PREVIEW_TYPE]: pluginLinkPreview,
  [SPOILER_TYPE]: pluginSpoiler,
  [VERTICAL_EMBED_TYPE]: pluginVerticalEmbed,
  [ACTION_BUTTON_TYPE]: pluginActionButton,
  [POLL_TYPE]: pluginPoll,
  [COLLAPSIBLE_LIST_TYPE]: pluginCollapsibleList,
  [TABLE_TYPE]: pluginTable,
};

export const getConfig = (additionalConfig = {}): RichContentViewerProps['config'] => {
  const _config = { ...config };
  Object.keys(additionalConfig).forEach(key => {
    if (additionalConfig[key]) {
      const orgConfig = config[key] || {};
      _config[key] = { ...orgConfig, ...additionalConfig[key] };
    }
  });

  return _config;
};

export const getInlineStyleMappers = (raw: DraftContent) => [
  textColorInlineStyleMapper(config, raw),
  textHighlightInlineStyleMapper(config, raw),
  spoilerInlineStyleMapper(config, raw),
];

export const decorators: Decorator[] = [
  new HashtagDecorator({
    theme,
    ...config[HASHTAG_TYPE],
  }),
  new CodeBlockDecorator({ theme }),
  createHeadersMarkdownDecorator(config),
];
