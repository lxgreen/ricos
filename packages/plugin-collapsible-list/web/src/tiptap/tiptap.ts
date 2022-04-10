import collapsibleListDataDefaults from 'ricos-schema/dist/statics/collapsible_list.defaults.json';
import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import {
  CollapsibleList,
  CollapsibleListItem,
  CollapsibleListItemTitle,
  CollapsibleListItemBody,
} from './component';
import {
  TIPTAP_COLLAPSIBLE_LIST_TYPE,
  TIPTAP_COLLAPSIBLE_ITEM_TYPE,
  TIPTAP_COLLAPSIBLE_ITEM_TITLE_TYPE,
  TIPTAP_COLLAPSIBLE_ITEM_BODY_TYPE,
} from 'ricos-content';
import { defaultCollapsibleItem } from './defaults';
import { keyboardShortcuts } from './keyboardShortcuts';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [TIPTAP_COLLAPSIBLE_LIST_TYPE]: {
      /**
       * Add new item to existing collapsible list
       */
      addCollapsibleListItem: (position: string) => ReturnType;
    };
  }
}

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    groups: ['react'],
    Component: CollapsibleList,
    name: TIPTAP_COLLAPSIBLE_LIST_TYPE,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        content: `(${TIPTAP_COLLAPSIBLE_ITEM_TYPE})+`,
        addAttributes: () => collapsibleListDataDefaults,
        addOptions: () => defaultOptions,
        addKeyboardShortcuts() {
          return keyboardShortcuts;
        },
        addCommands() {
          return {
            addCollapsibleListItem:
              position =>
              ({ commands }) => {
                return commands.insertContentAt(position - 1, defaultCollapsibleItem);
              },
          };
        },
      };
    },
  },
  {
    type: 'node' as const,
    groups: ['react'],
    Component: CollapsibleListItem,
    name: TIPTAP_COLLAPSIBLE_ITEM_TYPE,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        draggable: true,
        content: `${TIPTAP_COLLAPSIBLE_ITEM_TITLE_TYPE} ${TIPTAP_COLLAPSIBLE_ITEM_BODY_TYPE}`,
        addAttributes: () => ({
          isExpanded: { default: true },
        }),
        addOptions: () => defaultOptions,
      };
    },
  },
  {
    type: 'node' as const,
    groups: ['react'],
    Component: CollapsibleListItemTitle,
    name: TIPTAP_COLLAPSIBLE_ITEM_TITLE_TYPE,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        draggable: true,
        content: 'block+',
        addOptions: () => defaultOptions,
      };
    },
  },
  {
    type: 'node' as const,
    groups: ['react'],
    Component: CollapsibleListItemBody,
    name: TIPTAP_COLLAPSIBLE_ITEM_BODY_TYPE,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        draggable: true,
        content: 'block+',
        addOptions: () => defaultOptions,
      };
    },
  },
];
