import React, { useContext } from 'react';
import type { IToolbarItemConfigTiptap } from 'wix-rich-content-toolbars-v3';
import { Content, RicosToolbarComponent, ToggleButton } from 'wix-rich-content-toolbars-v3';
import type { Node } from 'prosemirror-model';
import { TiptapEditorContext } from 'wix-tiptap-editor';
import { PluginsContext } from 'ricos-plugins';
import styles from '../../../statics/styles/floating-add-plugin-menu.scss';
const content = Content.create<Node[]>([]);

const AddPluginMenuHorizontal = props => {
  const { getEditorCommands } = useContext(TiptapEditorContext);
  const { plugins } = useContext(PluginsContext);
  const { onPluginMenuButtonClick } = props;

  const renderers = {};

  const setRenderers = (buttonId, onClick) =>
    (renderers[buttonId] = toolbarItem => (
      <ToggleButton toolbarItem={toolbarItem} onClick={onClick} />
    ));

  plugins
    .getAddButtons()
    .asArray()
    .map(addButton => {
      const button = addButton.getButton();
      const onButtonClick = () => onPluginMenuButtonClick(button.modal, button.command);
      return setRenderers(button.id, onButtonClick);
    });

  return (
    <div className={styles.floating_add_plugin_menu_hor}>
      <RicosToolbarComponent
        toolbarItemsConfig={
          plugins
            .getAddButtons()
            .asArray()
            .map(button => button.toToolbarItemConfig()) as IToolbarItemConfigTiptap[]
        }
        toolbarItemsRenders={renderers}
        content={content}
        editorCommands={getEditorCommands?.()}
        isMobile={false}
      />
    </div>
  );
};

export default AddPluginMenuHorizontal;
