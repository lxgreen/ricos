import { RicosAnyExtensionConfig } from 'wix-rich-content-common';

export type RicosExtensionConfigCreatorParams<T extends RicosAnyExtensionConfig> = Omit<T, 'type'>;

export type RicosExtensionConfigCreator<T extends RicosAnyExtensionConfig> = (
  params: RicosExtensionConfigCreatorParams<T>
) => T;
