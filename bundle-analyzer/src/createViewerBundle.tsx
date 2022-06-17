import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import contentState from './contentState';
import type { DraftContent } from 'ricos-common';
import type { ViewerPlugin } from 'wix-rich-content-common';

export function createViewerBundle(plugin?: ViewerPlugin | ViewerPlugin[]) {
  const content: DraftContent = contentState;

  const plugins: ViewerPlugin[] = Array.isArray(plugin) ? plugin : [plugin];
  return <RicosViewer plugins={plugins} content={content} />;
}
