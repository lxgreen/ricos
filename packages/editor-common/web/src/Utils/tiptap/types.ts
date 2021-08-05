import { RicosTiptapExtension, RicosExtension } from 'wix-rich-content-common';

export type CreateExtensionParams<T extends RicosExtension> = Omit<RicosTiptapExtension<T>, 'type'>;

export type CreateExtension<T extends RicosExtension> = (
  params: CreateExtensionParams<T>
) => RicosTiptapExtension<T>;
