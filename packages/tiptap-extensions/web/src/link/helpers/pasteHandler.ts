import type { Editor } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import type { MarkType } from 'prosemirror-model';
import { find } from 'linkifyjs';

type PasteHandlerOptions = {
  editor: Editor;
  type: MarkType;
  defaults: {
    target: string;
    rel: string;
  };
};

export function pasteHandler(options: PasteHandlerOptions): Plugin {
  return new Plugin({
    key: new PluginKey('handlePasteLink'),
    props: {
      handlePaste: (view, event, slice) => {
        const { state } = view;
        const { selection } = state;
        const { empty } = selection;

        if (empty) {
          return false;
        }

        let textContent = '';

        slice.content.forEach(node => {
          textContent += node.textContent;
        });

        const link = find(textContent).find(item => item.isLink && item.value === textContent);

        if (!textContent || !link) {
          return false;
        }

        options.editor.commands.setMark(options.type, {
          link: { href: link.href, ...options.defaults },
        });

        return true;
      },
    },
  });
}
