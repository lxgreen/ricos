import { RicosExtension } from 'ricos-tiptap-types';
import { createCommandsConfig } from '../../core-commands';
import {
  createDraftConfig,
  createFocusConfig,
  createHistoryConfig,
  createStylesConfig,
  createUniqueId,
  createBulletedList,
} from 'wix-tiptap-extensions';

export const coreConfigs: RicosExtension[] = [
  createDraftConfig(),
  createHistoryConfig(),
  createStylesConfig(),
  createFocusConfig(),
  createUniqueId(),
  createCommandsConfig(),
  createBulletedList(),
];
