import { flow } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import { ExtensionConfig } from '@tiptap/core';
import {
  isRicosNodeExtension,
  isRicosMarkExtension,
  isRicosFunctionalExtension,
  RicosTiptapExtension,
  EditorPlugin,
  TiptapExtensionConfig,
} from 'wix-rich-content-common';
import { firstRight } from 'ricos-content';
import {
  createRicosNodeConfig,
  createRicosMarkConfig,
  createRicosFunctionalExtensionConfig,
} from '..';

const identityExtensionConfig: ExtensionConfig = {
  name: 'identity',
  type: 'extension',
};

const toTiptapExtensions = (plugin: EditorPlugin) => O.fromNullable(plugin.tiptapExtensions);

const toExtensionConfig = (ext: RicosTiptapExtension) =>
  firstRight(ext, identityExtensionConfig as TiptapExtensionConfig, [
    [isRicosNodeExtension, createRicosNodeConfig],
    [isRicosMarkExtension, createRicosMarkConfig],
    [isRicosFunctionalExtension, createRicosFunctionalExtensionConfig],
  ]);

export const createRicosExtensionsConfigs = flow(
  A.map(toTiptapExtensions),
  A.compact,
  A.flatten,
  A.map(toExtensionConfig)
);
