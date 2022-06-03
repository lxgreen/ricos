import React, { useEffect } from 'react';
import { ToolbarButton } from 'wix-rich-content-editor-common';
import styles from '../../../statics/styles/floating-add-plugin-menu.scss';

const PluginMenuButton = ({
  Icon,
  label,
  onClick,
  t,
  tooltipText,
  languageDir,
  onButtonVisible,
}) => {
  useEffect(() => {
    onButtonVisible?.();
  }, []);
  const pluginButton = (
    <button
      dir={languageDir}
      className={styles.floatingAddPluginMenu_addPlugin_button}
      onClick={onClick}
    >
      <Icon />
      <div>{t(label)}</div>
    </button>
  );

  return <ToolbarButton tooltipText={tooltipText} button={pluginButton} />;
};

export default PluginMenuButton;
