import type { FC } from 'react';
import React, { useState } from 'react';
import styles from './ContentBuilder.scss';
import type { ComposerSidebarItem } from 'wix-style-react';
import { ComposerSidebar } from 'wix-style-react';
import type { Plugins } from './types';

interface SidebarProps {
  plugins: Plugins;
  setPanel: (id: number) => void;
}

export const Sidebar: FC<SidebarProps> = ({ plugins, setPanel }) => {
  const [selected, setSelected] = useState(0);
  const onSelect = (id: number) => {
    const newSelection = selected !== id ? id : -1;
    setSelected(newSelection);
    setPanel(newSelection);
  };
  const items = plugins.map(([label, Icon], id) => ({
    id,
    label,
    icon: <Icon />,
    onClick: () => onSelect(id),
  })) as ComposerSidebarItem[];

  return (
    <ComposerSidebar
      className={styles.composer}
      size="large"
      labelPlacement="end"
      items={items}
      selectedId={selected}
    />
  );
};
