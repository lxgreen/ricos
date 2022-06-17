import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-viewer';
import { RicosViewer } from 'ricos-viewer';
import { pluginSpoiler } from 'wix-rich-content-plugin-spoiler/dist/module.viewer';

const SpoilerViewer: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginSpoiler()]} />
);

export default SpoilerViewer;
