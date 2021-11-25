import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { COLLAPSIBLE_LIST_TYPE, CollapsibleListPluginEditorConfig } from '../types';
import {
  CreatePluginToolbar,
  TranslationFunction,
  EditorContextType,
} from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  t,
  isMobile,
  settings,
  locale,
  disableKeyboardEvents,
}: {
  t: TranslationFunction;
  settings: CollapsibleListPluginEditorConfig;
  isMobile: boolean;
  locale: string;
  disableKeyboardEvents: EditorContextType['disableKeyboardEvents'];
}) => {
  return {
    InlineButtons: createInlineButtons({
      t,
      disableKeyboardEvents,
    }),
    InsertButtons: createInsertButtons({ t, settings, isMobile, locale }),
    name: COLLAPSIBLE_LIST_TYPE,
  };
};

export default createToolbar;
