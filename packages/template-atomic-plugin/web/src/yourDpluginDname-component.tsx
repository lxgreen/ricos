import React from 'react';
import YourPluginNameViewer from './yourDpluginDname-viewer';
import type { YourPluginNamePluginEditorConfig } from './types';
import { YOUR_PLUGIN_NAME_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { ComponentData, RichContentTheme } from 'wix-rich-content-common';

interface Props {
  componentData: ComponentData;
  settings: YourPluginNamePluginEditorConfig;
  theme: RichContentTheme;
}

class YourPluginNameComponent extends React.Component<Props> {
  static type = { YOUR_PLUGIN_NAME_TYPE };

  render() {
    const { componentData, settings, theme } = this.props;
    return <YourPluginNameViewer componentData={componentData} settings={settings} theme={theme} />;
  }
}

export { YourPluginNameComponent as Component, DEFAULTS };
