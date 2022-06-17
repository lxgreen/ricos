import theme from '../theme/theme';
import { VIDEO_TYPE, videoTypeMapper } from 'wix-rich-content-plugin-video/viewer';
import { AUDIO_TYPE, audioTypeMapper } from 'wix-rich-content-plugin-audio/viewer';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/viewer';
import { htmlTypeMapper } from 'wix-rich-content-plugin-html/viewer';
import { LINK_TYPE, linkTypeMapper } from 'wix-rich-content-plugin-link/viewer';
import {
  LINK_PREVIEW_TYPE,
  linkPreviewTypeMapper,
} from 'wix-rich-content-plugin-link-preview/viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/viewer';
import { galleryTypeMapper, GALLERY_TYPE } from 'wix-rich-content-plugin-gallery/viewer';
import { mapTypeMapper } from 'wix-rich-content-plugin-map/viewer';
import { giphyTypeMapper, GIPHY_TYPE } from 'wix-rich-content-plugin-giphy/viewer';
import { buttonTypeMapper } from 'wix-rich-content-plugin-button/viewer';
import { HashtagDecorator } from 'wix-rich-content-plugin-hashtag/viewer';
import { MENTION_TYPE, mentionsTypeMapper } from 'wix-rich-content-plugin-mentions/viewer';
import { fileUploadTypeMapper, FILE_UPLOAD_TYPE } from 'wix-rich-content-plugin-file-upload/viewer';
import {
  textColorInlineStyleMapper,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  textHighlightInlineStyleMapper,
} from 'wix-rich-content-plugin-text-color/viewer';

import {
  viewerCustomForegroundStyleFn,
  viewerCustomBackgroundStyleFn,
  styleSelectionPredicate,
} from '../../src/text-color-style-fn';

import {
  spoilerInlineStyleMapper,
  initSpoilersContentState,
  SpoilerViewerWrapper,
  SPOILER_TYPE,
} from 'wix-rich-content-plugin-spoiler/viewer';

import type { DraftContent } from 'wix-rich-content-common';

const linkPluginSettings = {
  // eslint-disable-next-line no-console
  onClick: (event, url) => console.log('link clicked!', url),
};
const mentionsPluginSettings = {
  // eslint-disable-next-line no-console
  onMentionClick: mention => console.log('mention clicked!', mention),
  getMentionLink: () => '/link/to/mention',
};

export const typeMappers = [
  videoTypeMapper,
  audioTypeMapper,
  buttonTypeMapper,
  dividerTypeMapper,
  htmlTypeMapper,
  linkTypeMapper,
  linkPreviewTypeMapper,
  mentionsTypeMapper,
  imageTypeMapper,
  galleryTypeMapper,
  mapTypeMapper,
  fileUploadTypeMapper,
  giphyTypeMapper,
];

export const config = {
  [GALLERY_TYPE]: {
    scrollingElement:
      typeof window !== 'undefined' && document.getElementsByClassName('preview-example')[0],
  },
  [GIPHY_TYPE]: {
    giphySdkApiKey: process.env.GIPHY_API_KEY,
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  // [HTML_TYPE]: {},
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
          () =>
            resolve(
              // eslint-disable-next-line max-len
              'https://cms.education.gov.il/NR/rdonlyres/BFBDB737-89E9-4B70-A1FF-1122B7AE8F1D/69371/14_HEB_ClassRecipeBook.pdf'
            ),
          1000
        )
      ),
  },
  [VIDEO_TYPE]: {
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`,
  },
  [AUDIO_TYPE]: {
    getAudioUrl: src => `https://static.wixstatic.com/${src.id}`,
  },
  [SPOILER_TYPE]: { initSpoilersContentState, SpoilerViewerWrapper },
};

export const getInlineStyleMappers = (raw: DraftContent) => [
  textColorInlineStyleMapper(config, raw),
  textHighlightInlineStyleMapper(config, raw),
  spoilerInlineStyleMapper(config, raw),
];

export const getConfig = (additionalConfig = {}) => {
  const _config = { ...config };
  Object.keys(additionalConfig).forEach(key => {
    _config[key] = { ...(_config[key] || {}), ...(additionalConfig[key] || {}) };
  });

  return _config;
};

export const decorators = [
  new HashtagDecorator({
    theme,
    onClick: (event, text) => {
      event.preventDefault();
      // eslint-disable-next-line no-console
      console.log(`'${text}' hashtag clicked!`);
    },
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
  }),
];
