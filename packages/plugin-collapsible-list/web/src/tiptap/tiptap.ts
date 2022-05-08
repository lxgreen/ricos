import collapsibleListDataDefaults from 'ricos-schema/dist/statics/collapsible_list.defaults.json';
import type { CreateRicosExtensions, PluginProps } from 'ricos-tiptap-types';
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
import type { ComponentType } from 'react';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

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

export const createRicosExtensions: CreateRicosExtensions = settings => [
  {
    type: 'node' as const,
    groups: ['react'],
    Component: decorateComponentWithProps(CollapsibleList, {
      settings,
    }) as ComponentType<PluginProps>,
    name: TIPTAP_COLLAPSIBLE_LIST_TYPE,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        content: `(${TIPTAP_COLLAPSIBLE_ITEM_TYPE})+`,
        addAttributes: () => collapsibleListDataDefaults,
        addOptions: () => settings,
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
    Component: decorateComponentWithProps(CollapsibleListItem, {
      settings,
    }) as ComponentType<PluginProps>,
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
        addOptions: () => settings,
      };
    },
  },
  {
    type: 'node' as const,
    groups: ['react'],
    Component: decorateComponentWithProps(CollapsibleListItemTitle, {
      settings,
    }) as ComponentType<PluginProps>,
    name: TIPTAP_COLLAPSIBLE_ITEM_TITLE_TYPE,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        draggable: true,
        content: 'block+',
        addOptions: () => settings,
      };
    },
  },
  {
    type: 'node' as const,
    groups: ['react'],
    Component: decorateComponentWithProps(CollapsibleListItemBody, {
      settings,
    }) as ComponentType<PluginProps>,
    name: TIPTAP_COLLAPSIBLE_ITEM_BODY_TYPE,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        draggable: true,
        content: 'block+',
        addOptions: () => settings,
      };
    },
  },
];
