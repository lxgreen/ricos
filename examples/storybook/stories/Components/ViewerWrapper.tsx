import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent, RicosTheme, RicosViewerProps } from 'ricos-viewer';
import { RicosViewer } from 'ricos-viewer';
import type { RichContentViewerProps } from 'wix-rich-content-viewer';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { pluginLinkButton, pluginActionButton } from 'wix-rich-content-plugin-button/viewer';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block/viewer';
import { pluginDivider } from 'wix-rich-content-plugin-divider/viewer';
import { pluginEmoji } from 'wix-rich-content-plugin-emoji/viewer';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload/viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/viewer';
import { pluginCollapsibleList } from 'wix-rich-content-plugin-collapsible-list/viewer';
import { pluginGiphy } from 'wix-rich-content-plugin-giphy/viewer';
import { pluginHashtag } from 'wix-rich-content-plugin-hashtag/viewer';
import { pluginHeadersMarkdown } from 'wix-rich-content-plugin-headers-markdown/viewer';
import { pluginHtml } from 'wix-rich-content-plugin-html/viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing/viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/viewer';
import { pluginMap } from 'wix-rich-content-plugin-map/viewer';
import { pluginMentions } from 'wix-rich-content-plugin-mentions/viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/viewer';
import { pluginAudio } from 'wix-rich-content-plugin-audio/viewer';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview/viewer';
import { pluginVerticalEmbed } from 'wix-rich-content-plugin-vertical-embed/viewer';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color/viewer';
import MobileDetect from 'mobile-detect';
import { mockFileUploadFunc } from '../../src/shared/utils/fileUploadUtil';
import styles from './styles.scss';

const configs = {
  fileUpload: {
    accept: '*',
    handleFileSelection: mockFileUploadFunc,
  },
  giphy: {
    giphySdkApiKey: process.env.GIPHY_API_KEY || 'HXSsAGVNzjeUjhKfhhD9noF8sIbpYDsV',
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  hashtag: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: e => e.preventDefault(),
  },
};

const plugins = [
  pluginLinkButton(),
  pluginActionButton(),
  pluginCodeBlock(),
  pluginDivider(),
  pluginEmoji(),
  pluginFileUpload(configs.fileUpload),
  pluginGallery(),
  pluginGiphy(configs.giphy),
  pluginHashtag(configs.hashtag),
  pluginHtml(),
  pluginImage(),
  pluginHeadersMarkdown(),
  pluginLineSpacing(),
  pluginLink(),
  pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  pluginMentions(),
  pluginVideo(),
  pluginAudio(),
  pluginTextColor(),
  pluginTextHighlight(),
  pluginLinkPreview(),
  pluginCollapsibleList(),
  pluginVerticalEmbed(),
];

const mobileDetect = new MobileDetect(window.navigator.userAgent);

interface Props {
  content?: DraftContent;
  isMobile?: boolean;
  preview?: RicosViewerProps['preview'];
  addAnchors?: RicosViewerProps['addAnchors'];
  normalize?: RichContentViewerProps['normalize'];
  theme?: RicosTheme;
}

const ViewerWrapper: FunctionComponent<Props> = ({
  content,
  theme,
  isMobile = mobileDetect.mobile() !== null,
  addAnchors,
  normalize,
  preview,
}) => {
  return (
    <div className={styles['rcv-wrapper']}>
      <RicosViewer
        plugins={plugins}
        theme={theme}
        content={content}
        isMobile={isMobile}
        preview={preview}
        addAnchors={addAnchors}
        mediaSettings={{ fullscreenProps: { backgroundColor: 'black', foregroundColor: 'white' } }}
      >
        <RichContentViewer normalize={normalize} />
      </RicosViewer>
    </div>
  );
};

export default ViewerWrapper;
