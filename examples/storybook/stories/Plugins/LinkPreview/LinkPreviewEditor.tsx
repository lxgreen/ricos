import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-editor';
import { RicosEditor } from 'ricos-editor';
import { pluginLinkPreview, LinkPreviewProviders } from 'wix-rich-content-plugin-link-preview';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginHtml } from 'wix-rich-content-plugin-html';
import { mockFetchUrlPreviewData } from '../../../src/shared/utils/linkPreviewUtil';

const { Instagram, Twitter, TikTok } = LinkPreviewProviders;

const plugins = [
  pluginLink(),
  pluginLinkPreview({
    fetchData: mockFetchUrlPreviewData(),
    exposeEmbedButtons: [Instagram, Twitter, TikTok],
    enableEmbed: true,
  }),
  pluginHtml(),
];

const LinkPreviewEditor: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosEditor plugins={plugins} content={content} />
);

export default LinkPreviewEditor;
