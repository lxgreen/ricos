import { isGeneric, isMark, isNode } from './typeCheckers';
import { compact, flatten } from 'lodash';
import { EditorPlugin } from 'wix-rich-content-common';
import { createRicosNodeConfig } from './node';
import { createRicosMarkConfig } from './mark';
import { createRicosGenericExtensionConfig } from './extension';

export const createRicosExtensionsConfigs = (ricosExtensions: EditorPlugin[]) => {
  const tiptapExtensions = flatten(
    compact(ricosExtensions.map(extension => extension.tiptapExtensions))
  );
  const configs = tiptapExtensions.map(extension => {
    if (isNode(extension)) {
      return createRicosNodeConfig(extension);
    } else if (isMark(extension)) {
      return createRicosMarkConfig(extension);
    } else if (isGeneric(extension)) {
      return createRicosGenericExtensionConfig(extension);
    }
    throw Error('Extension type is unknown');
  });
  return configs;
};
