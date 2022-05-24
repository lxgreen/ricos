export { tiptapStaticToolbarConfig } from './toolbarItemConfig/tiptapToolbarItemConfig';

export const toolbarsV3 = () => {
  // eslint-disable-next-line no-console
  console.log('toolbarsV3');
  return 'toolbarsV3';
};

export { default as RicosDraftToolbar } from './components/RicosDraftToolbar';
export { default as RicosTiptapToolbar } from './components/RicosTiptapToolbar';
export { Content } from './Content';
export { ToolbarContext } from './utils/toolbarContexts';
export { IToolbarItemConfigTiptap } from './types';
export { FloatingToolbar } from './components/FloatingToolbar/FloatingToolbar';
export * from './resolvers/tiptapResolvers';
export { ToggleButton } from './components/buttons';
export { default as RicosToolbarComponent } from './components/RicosToolbarComponent';
