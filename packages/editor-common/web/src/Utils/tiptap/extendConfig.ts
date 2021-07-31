import { merge } from 'lodash';
import { TiptapExtensionConfig, CreateTiptapExtensionConfig } from 'wix-rich-content-common';

export const extendConfig = <T extends TiptapExtensionConfig>(
  createConfig: CreateTiptapExtensionConfig<Omit<T, 'name'>>,
  overrides: CreateTiptapExtensionConfig<T>
) => (...args: Parameters<typeof createConfig>) =>
  merge(createConfig(...args), overrides(...args) || {});
