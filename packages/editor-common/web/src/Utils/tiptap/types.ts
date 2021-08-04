import { RicosTiptapExtension, ExtensionType } from 'wix-rich-content-common';

export type CreateExtensionParams<T extends ExtensionType> = Omit<RicosTiptapExtension<T>, 'type'>;

export type CreateExtension<T extends ExtensionType> = (
  params: CreateExtensionParams<T>
) => RicosTiptapExtension<T>;
