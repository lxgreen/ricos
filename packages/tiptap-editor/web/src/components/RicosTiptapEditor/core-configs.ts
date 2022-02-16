import type { RicosExtension } from 'ricos-tiptap-types';
import { createCommandsConfig } from '../../core-commands';
import {
  createDraftConfig,
  createFocusConfig,
  createHistoryConfig,
  createStylesConfig,
  createBulletedList,
  createBold,
  createParagraph,
  createItalic,
  createUnderline,
  createText,
  createDoc,
  createListItem,
  createBlockquote,
  createOrderedList,
  createTrailingNode,
  createLink,
  createPlaceholder,
} from 'wix-tiptap-extensions';

export const coreConfigs: RicosExtension[] = [
  createDraftConfig(),
  createHistoryConfig(),
  createStylesConfig(),
  createFocusConfig(),
  createCommandsConfig(),
  createBulletedList(),
  createBold(),
  createParagraph(),
  createItalic(),
  createUnderline(),
  createText(),
  createDoc(),
  createListItem(),
  createBlockquote(),
  createOrderedList(),
  createTrailingNode(),
  // TODO: pass config?
  createLink({}),
  createPlaceholder(),
];
