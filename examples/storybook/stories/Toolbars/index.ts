import pluginMenuStory from './PluginMenuStory';
export { default as ShortcutMenu } from './ShortcutMenuStory';
export { default as ExternalFormattingToolbar } from './FormattingExternalToolbar';
export { default as TextSelectionListener } from './TextSelectionToolbar';

export const PluginMenuDesktop = () => pluginMenuStory(false);
export const PluginMenuMobile = () => pluginMenuStory(true);

export default {
  title: 'Toolbars',
};
