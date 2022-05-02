import React, { useContext, useRef } from 'react';
import styles from '../../../statics/styles/floating-add-plugin-menu.scss';
import { ModalContext } from 'ricos-modals';
import { RicosContext, decorateComponentWithProps } from 'wix-rich-content-editor-common';
import PluginMenuButton from './PluginMenuButton';
import { AddPluginMenu } from 'wix-rich-content-editor';
import EditorSelectionToPos from './EditorSelectionToPos';
import AddButton from './AddButton';

const FloatingAddPluginMenu = ({ editor, pluginsButtons }) => {
  const floatingMenuWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { modalService } = useContext(ModalContext) || {};
  const { t, isMobile, getEditorCommands, theme, languageDir } = useContext(RicosContext) || {};
  const offsetTop = floatingMenuWrapperRef?.current?.getBoundingClientRect().top;
  const PLUGIN_MENU_MODAL_ID = 'pluginMenu';

  const handleOpen = () => {
    modalService?.openModal({
      Component: decorateComponentWithProps(pluginMenuModal, {
        t,
        plugins: pluginMenuButtons,
        isMobile,
        theme,
        pluginMenuButtonRef: buttonRef,
      }),
      id: PLUGIN_MENU_MODAL_ID,
      positioning: { referenceElement: buttonRef?.current },
      groups: ['popover'],
    });
  };

  const handleClose = () => modalService?.closeModal(PLUGIN_MENU_MODAL_ID);

  const renderPluginButton = ({ modal, label, command, tooltip, icon }) => {
    const onButtonClick = () => {
      modal && handleClose();
      return modal
        ? modalService?.openModal({
            positioning: {
              referenceElement: buttonRef?.current,
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
      />
    );
  };

  const pluginMenuButtons = pluginsButtons.flat().map(addButton => {
    return {
      component: () => renderPluginButton(addButton),
      name: addButton.label,
    };
  });

  const pluginMenuModal = () => (
    <AddPluginMenu
      t={t}
      plugins={pluginMenuButtons}
      isMobile={isMobile}
      theme={theme}
      pluginMenuButtonRef={buttonRef}
    />
  );

  return (
    <div
      dir={languageDir}
      className={styles.floatingAddPluginMenu_wrapper}
      ref={floatingMenuWrapperRef}
    >
      <EditorSelectionToPos editor={editor} offsetTop={offsetTop}>
        <AddButton isMobile={isMobile} onClick={handleOpen} buttonRef={buttonRef} />
      </EditorSelectionToPos>
    </div>
  );
};

export default FloatingAddPluginMenu;
