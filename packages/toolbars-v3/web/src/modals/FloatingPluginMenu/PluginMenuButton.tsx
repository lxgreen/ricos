import React, { useEffect } from 'react';
import type { TextDirection, TranslationFunction } from 'ricos-types';
import { ToolbarButton } from 'wix-rich-content-editor-common';
import styles from './styles/floating-add-plugin-menu.scss';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Icon: React.ComponentType<{}>;
  label?: string;
  onClick?: () => void;
  t: TranslationFunction;
  tooltipText: string;
  languageDir: TextDirection;
  onButtonVisible?: () => void;
}

const PluginMenuButton: React.FC<Props> = ({
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
      {label && <div>{t(label)}</div>}
    </button>
  );

  return <ToolbarButton tooltipText={tooltipText} button={pluginButton} />;
};

export default PluginMenuButton;
