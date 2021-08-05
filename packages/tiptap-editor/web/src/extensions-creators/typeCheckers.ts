import {
  RicosAnyExtensionConfig,
  RicosNodeExtensionConfig,
  RicosMarkExtensionConfig,
  RicosExtensionConfig,
} from 'wix-rich-content-common';

export function isNode(extension: RicosAnyExtensionConfig): extension is RicosNodeExtensionConfig {
  return extension.type === 'node';
}

export function isMark(extension: RicosAnyExtensionConfig): extension is RicosMarkExtensionConfig {
  return extension.type === 'mark';
}

export function isGeneric(extension: RicosAnyExtensionConfig): extension is RicosExtensionConfig {
  return extension.type === 'extension';
}
