import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-editor';
import { RicosEditor } from 'ricos-editor';
import {
  pluginVerticalEmbed,
  verticalEmbedProviders,
} from 'wix-rich-content-plugin-vertical-embed';
import { MockVerticalSearchModule } from '../../../src/shared/utils/verticalEmbedUtil';

const { event, booking, product } = verticalEmbedProviders;

const getPlugins = withError => [
  pluginVerticalEmbed({
    verticalsApi: type => (withError ? new Error() : new MockVerticalSearchModule(type)),
    exposeEmbedButtons: [product, event, booking],
  }),
];

const VerticalEmbedEditor: FunctionComponent<{ content?: DraftContent; withError?: boolean }> = ({
  content,
  withError,
}) => <RicosEditor plugins={getPlugins(withError)} content={content} />;

export default VerticalEmbedEditor;
