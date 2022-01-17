import React from 'react';
import VerticalEmbedComponent from '../components/vertical-embed-component';
import type { PluginProps } from 'wix-rich-content-editor-common';
import { VERTICAL_EMBED_TYPE } from '../types';

export const AppEmbed: React.FC<PluginProps> = ({ context, componentData }) => {
  const { t, config = {} } = context;
  const helpers = {};
  const settings = config[VERTICAL_EMBED_TYPE] || {};
  const locale = 'en';
  const className = '';

  return (
    <div>
      <VerticalEmbedComponent
        componentData={componentData}
        settings={settings}
        t={t}
        helpers={helpers}
        locale={locale}
        className={className}
      />
    </div>
  );
};
