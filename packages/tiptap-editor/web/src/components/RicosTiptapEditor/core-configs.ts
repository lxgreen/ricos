import { RicosExtension } from 'ricos-tiptap-types';
import {
  createDraftConfig,
  createFocusConfig,
  createHistoryConfig,
  createStylesConfig,
  createUniqueId,
} from 'wix-tiptap-extensions';

export const coreConfigs: RicosExtension[] = [
  createDraftConfig(),
  createHistoryConfig(),
  createStylesConfig(),
  createFocusConfig(),
  createUniqueId(),
];
