import React, { useState, useEffect } from 'react';
import { CirclePlusIcon as PlusIcon } from 'wix-rich-content-ui-components';
import styles from '../../statics/styles/floating-add-plugin-menu.scss';
import { posToDOMRect } from './utils/posToDOMRect';

const FloatingAddPluginMenu = props => {
  const [position, setPosition] = useState({ top: '0px', left: '-40px' });
  const { editor } = props;

  const handleButtonPosition = () => {
    const { selection } = editor.state;
    const { top } = posToDOMRect(editor.view, selection.from, selection.to);
    const topPos = top < 53 ? position.top : `${top - 100}px`;
    setPosition({ ...position, top: topPos });
  };

  useEffect(() => {
    handleButtonPosition();
  }, [editor.state]);

  return (
    <div className={styles.floatingAddPluginMenu_wrapper}>
      <PlusIcon className={styles.floatingAddPluginMenu_button} style={{ ...position }} />
    </div>
  );
};

export default FloatingAddPluginMenu;
