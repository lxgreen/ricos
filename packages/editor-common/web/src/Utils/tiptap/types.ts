import { RicosTiptapExtension, ExtensionType } from 'wix-rich-content-common';

export type CreateExtensionParams<T extends ExtensionType> = T extends 'node'
  ? Omit<RicosTiptapExtension<'node'>, 'type'>
  : T extends 'mark'
  ? Omit<RicosTiptapExtension<'mark'>, 'type'>
  : Omit<RicosTiptapExtension<'extension'>, 'type'>;

export type CreateExtension<T extends ExtensionType> = (
  params: CreateExtensionParams<T>
) => RicosTiptapExtension<T>;
