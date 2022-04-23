import { createCommandsConfig } from '../../core-commands';
import {
  createDraftConfig,
  createFocusConfig,
  createHistoryConfig,
  createStylesConfig,
  createParagraph,
  createText,
  createDoc,
  createTrailingNode,
  createUniqueId,
  createTextDirection,
} from 'wix-tiptap-extensions';

export const coreConfigs = [
  createDraftConfig(),
  createHistoryConfig(),
  createStylesConfig(),
  createFocusConfig(),
  createCommandsConfig(),
  createUniqueId(),
  createTextDirection(),
  createParagraph(),
  createText(),
  createDoc(),
  createTrailingNode(),
];
