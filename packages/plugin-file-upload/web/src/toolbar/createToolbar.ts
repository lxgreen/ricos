import createInsertButtons from './insert-buttons';
import createInlineButtons from './inline-buttons';
import type { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import type { FilePluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
}: {
  t: TranslationFunction;
  settings: FilePluginEditorConfig;
}) => {
  return {
    InlineButtons: createInlineButtons({ settings, t }),
    InsertButtons: createInsertButtons({ settings, t }),
    name: 'FileUpload',
  };
};

export default createToolbar;
