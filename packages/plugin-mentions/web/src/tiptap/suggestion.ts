import Suggestion from '@tiptap/suggestion';
import { ReactRenderer, Editor } from '@tiptap/react';
import tippy from 'tippy.js';
import MentionList from './MentionList.jsx';

export default (
  editor,
  {
    mentionTrigger,
    getMentions,
    visibleItemsBeforeOverflow,
    popoverComponent,
    handleDropdownOpen,
    handleDropdownClose,
  },
  PluginKey
) =>
  Suggestion({
    editor,
    char: mentionTrigger,
    pluginKey: new PluginKey('mention'),
    command: ({ editor, range, props }) => {
      editor.commands.insertMention({ name: props.id }, range);
    },
    items: async ({ query }) => {
      const mentions = await getMentions(query);
      return mentions.map(mention => mention.name).slice(0, visibleItemsBeforeOverflow);
    },
    render: () => {
      let component;
      let popup;

      return {
        onStart: props => {
          handleDropdownOpen?.();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component = new ReactRenderer(MentionList as any, {
            editor: editor as Editor,
            props: { ...props, container: popoverComponent },
          });

          popup = tippy('body', {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
          });
        },

        onUpdate(props) {
          component.updateProps(props);

          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },

        onKeyDown(props) {
          if (props.event.key === 'Escape') {
            popup[0].hide();
            handleDropdownClose?.();

            return true;
          }

          return component.ref?.onKeyDown(props);
        },

        onExit() {
          popup[0].destroy();
          component.destroy();
          handleDropdownClose?.();
        },
      };
    },
  });
