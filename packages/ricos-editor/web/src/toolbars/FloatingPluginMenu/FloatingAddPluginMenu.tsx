import React, { useContext, useRef } from 'react';
import styles from '../../../statics/styles/floating-add-plugin-menu.scss';
import { ModalContext, PLACEMENTS, LAYOUTS } from 'ricos-modals';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';
import PluginMenuButton from './PluginMenuButton';
import { AddPluginMenu, SECTIONS } from 'wix-rich-content-editor';
import EditorSelectionToPosition from './EditorSelectionToPosition';
import PlusButton from './PlusButton';
import { RicosContext, EditorContext } from 'ricos-context';
import { PluginsContext } from 'ricos-plugins';
import type { AddButton } from 'ricos-types';
import AddPluginMenuHorizontal from './AddPluginMenuHorizontal';
import { UploadServiceContext } from 'wix-rich-content-common';

const FloatingAddPluginMenu = ({ addPluginMenuConfig, helpers, isMobile = false }) => {
  const floatingMenuWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { modalService } = useContext(ModalContext) || {};
  const { plugins } = useContext(PluginsContext);
  const { t, theme, languageDir } = useContext(RicosContext) || {};
  const uploadContext = useContext(UploadServiceContext);
  const { getEditorCommands, tiptapEditor } = useContext(EditorContext);
  const isHorizontalMenu = !addPluginMenuConfig || addPluginMenuConfig?.horizontalMenuLayout;
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

  const isPluginMenuModalOpen = () =>
    modalService?.getOpenModals().some(({ id }) => id === PLUGIN_MENU_MODAL_ID);

  const toggleAddPluginMenu = () => {
    const modal = { Component: floatingMenuComponent, id: PLUGIN_MENU_MODAL_ID };
    isPluginMenuModalOpen()
      ? closeModal(PLUGIN_MENU_MODAL_ID)
      : openModal(modal, placement, layout);
  };

  const openModal = (modal, placement, layout) => {
    modalService?.openModal({
      Component: modal.Component,
      id: modal.id,
      positioning: { referenceElement: buttonRef?.current, placement },
      layout,
    });
  };

  const closeModal = id => modalService?.closeModal(id);

  const onPluginMenuButtonClick = (modal, command) => {
    closeModal(PLUGIN_MENU_MODAL_ID);
    const pluginModalLayout = isMobile ? LAYOUTS.FULLSCREEN : LAYOUTS.POPOVER;
    return modal
      ? openModal(modal, placement, pluginModalLayout)
      : command(getEditorCommands?.(), uploadContext);
  };

  const pluginMenuButtons = plugins
    .getAddButtons()
    .asArray()
    .map(addButton => {
      const button = addButton.getButton();
      const { command, modal } = button;
      const onButtonClick = () => onPluginMenuButtonClick(modal, command);
      return {
        component: props => renderPluginButton(button, onButtonClick, props.onButtonVisible),
        name: button.label,
        section: button.menuConfig?.group && SECTIONS[button.menuConfig?.group],
      };
    });

  const floatingMenuComponent = isHorizontalMenu
    ? decorateComponentWithProps(AddPluginMenuHorizontal, {
        onPluginMenuButtonClick,
      })
    : decorateComponentWithProps(AddPluginMenu, {
        t,
        plugins: pluginMenuButtons,
        isMobile,
        theme,
        pluginMenuButtonRef: buttonRef,
        addPluginMenuConfig,
        isActive: true,
        helpers,
      });

  const renderPluginButton = ({ icon, label, tooltip }: AddButton, onClick, onButtonVisible) => {
    return (
      <PluginMenuButton
        Icon={icon}
        label={label}
        onClick={onClick}
        tooltipText={t(tooltip)}
        t={t}
        languageDir={languageDir}
        onButtonVisible={onButtonVisible}
      />
    );
  };

  return !isMobile ? (
    <div
      dir={languageDir}
      className={styles.floatingAddPluginMenu_wrapper}
      ref={floatingMenuWrapperRef}
    >
      <EditorSelectionToPosition editor={tiptapEditor}>
        {position => (
          <PlusButton
            onClick={toggleAddPluginMenu}
            position={calcButtonPosition(position)}
            ref={buttonRef}
          />
        )}
      </EditorSelectionToPosition>
    </div>
  ) : null;
};

export default FloatingAddPluginMenu;
