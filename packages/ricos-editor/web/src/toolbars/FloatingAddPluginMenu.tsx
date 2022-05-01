import React, { useState, useEffect, useRef } from 'react';
import { CirclePlusIcon as PlusIcon } from 'wix-rich-content-ui-components';
import styles from '../../statics/styles/floating-add-plugin-menu.scss';
import { posToDOMRect } from './utils/posToDOMRect';
import classNames from 'classnames';

const FloatingAddPluginMenu = ({ editor, isMobile, languageDir }) => {
  const [position, setPosition] = useState({});
  const floatingMenuWrapperRef = useRef<HTMLDivElement>(null);

  const handleButtonPosition = () => {
    const { selection } = editor.state;
    const { top } = posToDOMRect(editor.view, selection.from, selection.to);
    const offsetTop = floatingMenuWrapperRef?.current?.getBoundingClientRect().top as number;
    const verticalPos = { top: `${top - offsetTop}px` };
    setPosition({ ...verticalPos });
  };

  useEffect(() => {
    handleButtonPosition();
  }, [editor.state]);

  return (
    <div
      dir={languageDir}
      className={styles.floatingAddPluginMenu_wrapper}
      ref={floatingMenuWrapperRef}
    >
      <button
        className={classNames(styles.floatingAddPluginMenu_button, {
          [styles.floatingAddPluginMenu_button_mobile]: isMobile,
        })}
        style={position}
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default FloatingAddPluginMenu;
