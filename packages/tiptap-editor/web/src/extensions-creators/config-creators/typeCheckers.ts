import {
  RicosTiptapExtension,
  RicosExtension,
  RicosNodeExtension,
  RicosMarkExtension,
  RicosGenericExtension,
} from 'wix-rich-content-common';

export function isNode(
  extension: RicosTiptapExtension<RicosExtension>
): extension is RicosTiptapExtension<RicosNodeExtension> {
  return extension.type === 'node';
}

export function isMark(
  extension: RicosTiptapExtension<RicosExtension>
): extension is RicosTiptapExtension<RicosMarkExtension> {
  return extension.type === 'mark';
}

export function isGeneric(
  extension: RicosTiptapExtension<RicosExtension>
): extension is RicosTiptapExtension<RicosGenericExtension> {
  return extension.type === 'extension';
}
