import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-editor';
import { RicosEditor } from 'ricos-editor';
import { pluginLinkButton, pluginActionButton } from 'wix-rich-content-plugin-button';

const config = {
  insertButtonTooltip: 'Custom action tooltip',
};

const plugins = [pluginActionButton(config), pluginLinkButton()];

const ButtonsEditor: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosEditor plugins={plugins} content={content} />
);

export default ButtonsEditor;
