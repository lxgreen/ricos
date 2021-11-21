import { createDraftConfig } from '../../extensions/extension-draft';
import { createFocusConfig } from '../../extensions/extension-focus/focus';
import { createHistoryConfig } from '../../extensions/extension-history';
import { createStylesConfig } from '../../extensions/extension-styles';
import { RicosExtension } from '../../models/extension-types';

export const coreConfigs: RicosExtension[] = [
  createDraftConfig(),
  createHistoryConfig(),
  createStylesConfig(),
  createFocusConfig(),
];
