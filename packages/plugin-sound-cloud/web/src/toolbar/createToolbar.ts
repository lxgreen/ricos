import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import type { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import type { SoundCloudPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  t,
  isMobile,
  settings,
}: {
  t: TranslationFunction;
  settings: SoundCloudPluginEditorConfig;
  isMobile: boolean;
}) => {
  return {
    InlineButtons: createInlineButtons({ t, isMobile, settings }),
    InsertButtons: createInsertButtons({ t, isMobile, settings }),
    name: 'soundCloud',
  };
};

export default createToolbar;
