import {
  CreateTiptapExtensionConfig,
  RicosTiptapExtension,
  TiptapExtensionConfig,
} from 'wix-rich-content-common';

interface CreateExtensionParams<T extends TiptapExtensionConfig> {
  Component?: React.ComponentType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDataDefaults: Record<string, any>;
  extensionConfig: CreateTiptapExtensionConfig<T>;
}

export type CreateExtension<T extends TiptapExtensionConfig> = (
  params: CreateExtensionParams<T>
) => RicosTiptapExtension<T>;
