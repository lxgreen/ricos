import React, { useContext, useRef } from 'react';
import styles from '../../../statics/styles/floating-add-plugin-menu.scss';
import { ModalContext, PLACEMENTS, LAYOUTS } from 'ricos-modals';
import { RicosContext, decorateComponentWithProps } from 'wix-rich-content-editor-common';
import PluginMenuButton from './PluginMenuButton';
import { AddPluginMenu } from 'wix-rich-content-editor';
import EditorSelectionToPosition from './EditorSelectionToPosition';
import PlusButton from './PlusButton';
import { TiptapEditorContext } from 'wix-tiptap-editor';
import { PluginsContext } from 'ricos-plugins';
import type { AddButton } from 'ricos-types';

const FloatingAddPluginMenu = ({ addPluginMenuConfig, helpers }) => {
  const floatingMenuWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { modalService } = useContext(ModalContext) || {};
  const { plugins } = useContext(PluginsContext);
  const { t, isMobile, theme, languageDir } = useContext(RicosContext) || {};
  const { getEditorCommands, tiptapEditor } = useContext(TiptapEditorContext);

  const PLUGIN_MENU_MODAL_ID = 'pluginMenu';
  const layout = isMobile ? LAYOUTS.DRAWER : LAYOUTS.TOOLBAR;
  const placement = isMobile
    ? PLACEMENTS.BOTTOM
    : languageDir === 'ltr'
    ? PLACEMENTS.RIGHT_START
    : PLACEMENTS.LEFT_START;

  const calcButtonPosition = position => {
    const offsetTop = floatingMenuWrapperRef?.current?.getBoundingClientRect().top || 0;
    const { top = 0 } = position;
    const lineHeightOffset = 2;
    const topWithOffset =
      Math.floor(top - offsetTop) !== 0 ? Math.floor(top - offsetTop - lineHeightOffset) : 0;
    const topPosition = top !== 0 ? Math.abs(topWithOffset) : 0;
    return { top: `${topPosition}px` };
  };

  const toggleAddPluginMenu = () => {
    modalService?.getOpenModals().find(({ id }) => id === PLUGIN_MENU_MODAL_ID)
      ? handleClose()
      : handleOpen();
  };

  const handleOpen = () => {
    modalService?.openModal({
      Component: decorateComponentWithProps(AddPluginMenu, {
        t,
        plugins: pluginMenuButtons,
        isMobile,
        theme,
        pluginMenuButtonRef: buttonRef,
        addPluginMenuConfig,
        isActive: true,
        helpers,
      }),
      id: PLUGIN_MENU_MODAL_ID,
      positioning: { referenceElement: buttonRef?.current, placement },
      layout,
    });
  };

  const handleClose = () => modalService?.closeModal(PLUGIN_MENU_MODAL_ID);

  const renderPluginButton = ({ modal, command, icon, label, tooltip }: AddButton) => {
    const onButtonClick = () => {
      handleClose();
      return modal
        ? modalService?.openModal({
            positioning: {
              referenceElement: buttonRef?.current,
              placement,
            },
            ...modal,
          })
        : command(getEditorCommands?.());
    };
    return (
      <PluginMenuButton
        Icon={icon}
        label={label}
        onClick={onButtonClick}
        tooltipText={t(tooltip)}
        t={t}
        languageDir={languageDir}
      />
    );
  };

  const pluginMenuButtons = plugins
    .getAddButtons()
    .asArray()
    .map(addButton => {
      const button = addButton.getButton();
      return {
        component: () => renderPluginButton(button),
        name: button.label,
      };
    });

  return (
    <div
      dir={languageDir}
      className={styles.floatingAddPluginMenu_wrapper}
      ref={floatingMenuWrapperRef}
    >
      <EditorSelectionToPosition editor={tiptapEditor}>
        {position => (
          <PlusButton
            isMobile={isMobile}
            onClick={toggleAddPluginMenu}
            position={calcButtonPosition(position)}
            ref={buttonRef}
          />
        )}
      </EditorSelectionToPosition>
    </div>
  );
};

export default FloatingAddPluginMenu;
