import { RicosTiptapExtension, ExtensionType } from 'wix-rich-content-common';

export function isNode(
  extension: RicosTiptapExtension<ExtensionType>
): extension is RicosTiptapExtension<'node'> {
  return extension.type === 'node';
}

export function isMark(
  extension: RicosTiptapExtension<ExtensionType>
): extension is RicosTiptapExtension<'mark'> {
  return extension.type === 'mark';
}

export function isGeneric(
  extension: RicosTiptapExtension<ExtensionType>
): extension is RicosTiptapExtension<'extension'> {
  return extension.type === 'extension';
}
