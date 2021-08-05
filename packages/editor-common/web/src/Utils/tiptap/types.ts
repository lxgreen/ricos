import { RicosAnyExtensionConfig } from 'wix-rich-content-common';

export type CreateExtensionParams<T extends RicosAnyExtensionConfig> = Omit<T, 'type'>;

export type CreateExtension<T extends RicosAnyExtensionConfig> = (
  params: CreateExtensionParams<T>
) => T;
