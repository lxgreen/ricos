import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-viewer';
import { RicosViewer } from 'ricos-viewer';
import { pluginVerticalEmbed } from 'wix-rich-content-plugin-vertical-embed/viewer';

const VerticalEmbedViewer: FunctionComponent<{ content?: DraftContent; disabled?: boolean }> = ({
  content,
  disabled = false,
}) => (
  <RicosViewer
    content={content}
    plugins={[
      pluginVerticalEmbed({
        disabled,
      }),
    ]}
  />
);

export default VerticalEmbedViewer;
