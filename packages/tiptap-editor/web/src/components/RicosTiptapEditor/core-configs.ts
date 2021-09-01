import { createDraftConfig } from '../../extensions/extension-draft';
import { createOnNodeFocusConfig } from '../../extensions/extension-focus/on-node-focus';
import { createHistoryConfig } from '../../extensions/extension-history';
import { createStylesConfig } from '../../extensions/extension-styles';
// import { TiptapExtensionConfig } from 'wix-rich-content-common';

export const coreConfigs = ({ theme }) => {
  return [
    createDraftConfig(),
    createHistoryConfig(),
    createStylesConfig({ theme }),
    focus,
    createOnNodeFocusConfig(),
  ];
};
