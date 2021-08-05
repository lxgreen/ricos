import { isGeneric, isMark, isNode } from './typeCheckers';
import { EditorPlugin } from 'wix-rich-content-common';
import { createRicosNodeConfig } from './node';
import { createRicosMarkConfig } from './mark';
import { createRicosExtensionConfig } from './extension';

export const createRicosExtensionsConfigs = (ricosExtensions: EditorPlugin[]) => {
  const tiptapExtensions = ricosExtensions.flatMap(
    ({ tiptapExtensions }) => tiptapExtensions || []
  );
  const configs = tiptapExtensions.map(extension => {
    if (isNode(extension)) {
      return createRicosNodeConfig(extension);
    } else if (isMark(extension)) {
      return createRicosMarkConfig(extension);
    } else if (isGeneric(extension)) {
      return createRicosExtensionConfig(extension);
    }
    throw Error('Extension type is unknown');
  });
  return configs;
};
