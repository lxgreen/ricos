import React from 'react';
import type { RichContentEditorProps } from 'wix-rich-content-editor';
import { RichContentEditor } from 'wix-rich-content-editor';
import type {
  DraftContent,
  LinkSettings,
  RicosEditorType,
  RicosTheme,
  ToolbarSettings,
} from 'ricos-editor';
import { RicosEditor } from 'ricos-editor';
import { pluginLinkButton, pluginActionButton } from 'wix-rich-content-plugin-button';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block';
import { pluginDivider, createDividerPlugin } from 'wix-rich-content-plugin-divider';
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
import { pluginIndent } from 'wix-rich-content-plugin-indent';
import { pluginLineSpacing, createLineSpacingPlugin } from 'wix-rich-content-plugin-line-spacing';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginMap, createMapPlugin } from 'wix-rich-content-plugin-map';
import { pluginMentions } from 'wix-rich-content-plugin-mentions';
import { pluginUndoRedo } from 'wix-rich-content-plugin-undo-redo';
import { pluginVideo, videoButtonsTypes } from 'wix-rich-content-plugin-video';
import { pluginAudio, audioButtonsTypes } from 'wix-rich-content-plugin-audio';
import { pluginPoll } from 'wix-rich-content-plugin-social-polls';
import { pluginLinkPreview, LinkPreviewProviders } from 'wix-rich-content-plugin-link-preview';
import {
  pluginVerticalEmbed,
  verticalEmbedProviders,
} from 'wix-rich-content-plugin-vertical-embed';
import { mockFetchUrlPreviewData } from '../../src/shared/utils/linkPreviewUtil';
import {
  pluginTextColor,
  pluginTextHighlight,
  createTextColorPlugin,
} from 'wix-rich-content-plugin-text-color';
import MobileDetect from 'mobile-detect';
import {
  mockFileUploadFunc,
  mockImageNativeUploadFunc,
} from '../../src/shared/utils/fileUploadUtil';
import { MockVerticalSearchModule } from '../../src/shared/utils/verticalEmbedUtil';
import { commands } from '../../src/shared/utils/commands/commands';
import styles from './styles.scss';

const { Instagram, Twitter, TikTok } = LinkPreviewProviders;
const { event, booking, product } = verticalEmbedProviders;

const configs = {
  fileUpload: {
    accept: '*',
    handleFileSelection: mockFileUploadFunc,
  },
  giphy: {
    giphySdkApiKey: process.env.GIPHY_API_KEY || 'HXSsAGVNzjeUjhKfhhD9noF8sIbpYDsV',
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  linkPreview: {
    fetchData: mockFetchUrlPreviewData(),
    exposeEmbedButtons: [Instagram, Twitter, TikTok],
  },
  verticalEmbed: {
    exposeEmbedButtons: [product, event, booking],
    verticalsApi: type => new MockVerticalSearchModule(type),
  },
  hashtag: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: e => e.preventDefault(),
  },
  image: {
    innerRCEPlugins: [
      createTextColorPlugin,
      createLineSpacingPlugin,
      createDividerPlugin,
      createMapPlugin,
    ],
  },
};

const plugins = [
  pluginLinkButton(),
  pluginActionButton(),
  pluginCodeBlock(),
  pluginDivider(),
  pluginHeadings(),
  pluginSpoiler(),
  pluginCollapsibleList({
    innerRCEPlugins: [
      pluginTextColor().createPlugin,
      pluginTextHighlight().createPlugin,
      pluginIndent().createPlugin,
      pluginLineSpacing().createPlugin,
      pluginLink().createPlugin,
      pluginCodeBlock().createPlugin,
    ],
  }),
  pluginTable({
    innerRCEPlugins: [
      pluginTextColor().createPlugin,
      pluginTextHighlight().createPlugin,
      pluginIndent().createPlugin,
      pluginLineSpacing().createPlugin,
      pluginLink().createPlugin,
      pluginImage().createPlugin,
      pluginVideo().createPlugin,
      pluginAudio().createPlugin,
      pluginGiphy().createPlugin,
      pluginEmoji().createPlugin,
      pluginFileUpload().createPlugin,
      pluginCodeBlock().createPlugin,
    ],
  }),
  pluginEmoji(),
  pluginFileUpload(configs.fileUpload),
  pluginGallery(),
  pluginGiphy(configs.giphy),
  pluginHashtag(configs.hashtag),
  pluginHtml(),
  pluginImage(configs.image),
  pluginIndent(),
  pluginHeadersMarkdown(),
  pluginLineSpacing(),
  pluginLink(),
  pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  pluginMentions(),
  pluginVideo({
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`,
    exposeButtons: [videoButtonsTypes.video, videoButtonsTypes.soundCloud],
  }),
  pluginAudio({
    getAudioUrl: src => `https://static.wixstatic.com/${src.id}`,
    exposeButtons: [
      audioButtonsTypes.audio,
      audioButtonsTypes.soundCloud,
      audioButtonsTypes.spotify,
    ],
  }),
  pluginLinkPreview(configs.linkPreview),
  pluginPoll(),
  pluginUndoRedo(),
  pluginTextColor(),
  pluginTextHighlight(),
  pluginVerticalEmbed(configs.verticalEmbed),
];

const pluginsMap = {
  button: pluginLinkButton(),
  codeBlock: pluginCodeBlock(),
  divider: pluginDivider(),
  emoji: pluginEmoji(),
  fileUpload: pluginFileUpload(configs.fileUpload),
  gallery: pluginGallery(),
  gif: pluginGiphy(configs.giphy),
  hashtag: pluginHashtag(),
  html: pluginHtml(),
  image: pluginImage(),
  indent: pluginIndent(),
  headers: pluginHeadersMarkdown(),
  lineSpacing: pluginLineSpacing(),
  link: pluginLink(),
  map: pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  mentions: pluginMentions(),
  video: pluginVideo(),
  audio: pluginAudio(),
  socialEmbed: pluginLinkPreview(configs.linkPreview),
  polls: pluginPoll(),
  undoRedo: pluginUndoRedo(),
  textColor: pluginTextColor(),
  spoiler: pluginSpoiler(),
  collapsibleList: pluginCollapsibleList(),
  table: pluginTable(),
  highlight: pluginTextHighlight(),
  verticalEmbed: pluginVerticalEmbed(configs.verticalEmbed),
};

const mobileDetect = new MobileDetect(window.navigator.userAgent);

const addPluginMenuConfig = {
  showSearch: true,
  splitToSections: true,
};
const footerToolbarConfig = {
  morePluginsMenu: {
    splitToSections: true,
    showSearch: true,
  },
};
const getToolbarSettings = () => [
  { name: 'SIDE', addPluginMenuConfig },
  { name: 'MOBILE', addPluginMenuConfig },
  { name: 'FOOTER', footerToolbarConfig },
];

interface Props {
  content?: DraftContent;
  injectedContent?: DraftContent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: any;
  isMobile?: boolean;
  pluginsToDisplay?: string[];
  toolbarSettings?: ToolbarSettings;
  linkSettings?: LinkSettings;
  onBlur?: RichContentEditorProps['onBlur'];
  onFocus?: RichContentEditorProps['onFocus'];
  theme?: RicosTheme;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rcProps?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  experiments?: Record<string, any>;
  modalSettings?: { container: HTMLElement };
}

class EditorWrapper extends React.Component<Props> {
  static defaultProps = {
    isMobile: mobileDetect.mobile() !== null,
    toolbarSettings: { getToolbarSettings },
  };

  editor: RicosEditorType;

  getToolbarProps = type => this.editor.getToolbarProps(type);

  editorPlugins = this.props.pluginsToDisplay
    ? this.props.pluginsToDisplay.map(plugin => pluginsMap[plugin])
    : plugins;

  render() {
    const {
      content,
      injectedContent,
      theme,
      onChange,
      isMobile,
      linkSettings,
      toolbarSettings,
      onBlur,
      onFocus,
      rcProps = {},
      experiments,
      modalSettings,
    } = this.props;

    return (
      <div className={styles['rce-wrapper']}>
        <RicosEditor
          ref={ref => (this.editor = ref)}
          plugins={this.editorPlugins}
          theme={theme}
          content={content}
          injectedContent={injectedContent}
          isMobile={isMobile}
          placeholder={'Share something...'}
          linkSettings={linkSettings}
          toolbarSettings={toolbarSettings}
          onChange={(...args) => {
            onChange?.(...args, this.editor);
          }}
          experiments={experiments}
          _rcProps={rcProps}
          onAtomicBlockFocus={d => console.log('onAtomicBlockFocus', d)} // eslint-disable-line
          commands={commands}
          modalSettings={modalSettings}
        >
          <RichContentEditor
            onFocus={onFocus}
            onBlur={onBlur}
            helpers={{ handleFileUpload: mockImageNativeUploadFunc }}
          />
        </RicosEditor>
      </div>
    );
  }
}

export default EditorWrapper;
