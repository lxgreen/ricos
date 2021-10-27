import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import {
  AvailableExperiments,
  CreatePluginToolbar,
  TranslationFunction,
} from 'wix-rich-content-common';
import { VerticalEmbedPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
  isMobile,
  locale,
  experiments,
}: {
  t: TranslationFunction;
  settings: VerticalEmbedPluginEditorConfig;
  isMobile: boolean;
  locale: string;
  experiments?: AvailableExperiments;
}) => {
  return {
    InlineButtons: createInlineButtons({ t, isMobile, settings, locale, experiments }),
    InsertButtons: createInsertButtons({ t, settings, isMobile, locale, experiments }),
    name: 'vertical-embed',
  };
};

export default createToolbar;
