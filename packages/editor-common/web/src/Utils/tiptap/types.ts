import { RicosTiptapExtension, TiptapExtensionConfig } from 'wix-rich-content-common';

export interface CreateExtensionParams<T extends TiptapExtensionConfig>
  extends Omit<RicosTiptapExtension<T>, 'type'> {}

export type CreateExtension<T extends TiptapExtensionConfig> = (
  params: CreateExtensionParams<T>
) => RicosTiptapExtension<T>;
