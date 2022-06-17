/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './OpenAddPluginPanel.scss';

const OpenAddPluginPanel = ({ toolbarItem }) => {
  const Icon = toolbarItem.presentation?.icon;
  return (
    <div className={styles.toggleButtonWrapper}>
      <div
        onMouseDown={e => e.preventDefault()}
        className={styles.toggleButton}
        role="button"
        onClick={toolbarItem.commands?.openAddPluginPanel}
        tabIndex={0}
      >
        <Icon />
      </div>
    </div>
  );
};

export default OpenAddPluginPanel;
