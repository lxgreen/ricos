import React, { useContext } from 'react';
import type { FC } from 'react';
import { Content, RicosToolbarComponent, ToggleButton } from 'wix-rich-content-toolbars-v3';
import type { IToolbarItemConfigTiptap } from 'wix-rich-content-toolbars-v3';
import { PluginsContext } from 'ricos-plugins';
import { RicosContext } from 'wix-rich-content-editor-common';
import { TiptapEditorContext } from 'wix-tiptap-editor';
import type { Node } from 'prosemirror-model';
import styles from '../../statics/styles/footer-toolbar.scss';

interface Props {}

const content = Content.create<Node[]>([]);

export const FooterToolbar: FC<Props> = () => {
  const { plugins } = useContext(PluginsContext);
  const { isMobile } = useContext(RicosContext) || {};
  const { getEditorCommands } = useContext(TiptapEditorContext);

  const renderers = {};
  plugins
    .getAddButtons()
    .asArray()
    .forEach(button => {
      renderers[button.getButton().id] = toolbarItem => {
        return (
          <ToggleButton toolbarItem={toolbarItem} onClick={e => toolbarItem.commands?.click(e)} />
        );
      };
    });

  return (
    <div className={styles.footerToolbar} data-hook="footerToolbar">
      <RicosToolbarComponent
        toolbarItemsConfig={
          plugins
            .getAddButtons()
            .asArray()
            .map(button => button.toToolbarItemConfig()) as IToolbarItemConfigTiptap[]
        }
        toolbarItemsRenders={renderers}
        content={content}
        editorCommands={getEditorCommands()}
        isMobile={isMobile}
      />
    </div>
  );
};
