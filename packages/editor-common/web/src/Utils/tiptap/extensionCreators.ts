import {
  RicosExtensionConfig,
  RicosMarkExtensionConfig,
  RicosNodeExtensionConfig,
} from 'wix-rich-content-common';
import { RicosExtensionConfigCreator } from './types';

export const createRicosNodeExtensionConfig: RicosExtensionConfigCreator<RicosNodeExtensionConfig> = params => ({
  type: 'node',
  ...params,
});

export const createRicosMarkExtensionConfig: RicosExtensionConfigCreator<RicosMarkExtensionConfig> = params => ({
  type: 'mark',
  ...params,
});

export const createRicosExtensionConfig: RicosExtensionConfigCreator<RicosExtensionConfig> = params => ({
  type: 'extension',
  ...params,
});
