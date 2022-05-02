import React from 'react';
import { ToolbarButton } from 'wix-rich-content-editor-common';

const PluginMenuButton = ({ Icon, label, onClick, t, tooltipText }) => {
  const pluginButton = (
    <button onClick={onClick}>
      <Icon />
      <div>{t(label)}</div>
    </button>
  );

  return <ToolbarButton tooltipText={tooltipText} button={pluginButton} />;
};

export default PluginMenuButton;
