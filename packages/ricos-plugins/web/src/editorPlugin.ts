import type {
  LegacyEditorPluginConfig,
  EditorPlugin as EditorPluginType,
  ModalService,
} from 'ricos-types';
import type { RicosExtension, TiptapEditorPlugin } from 'ricos-tiptap-types';
import type { Plugin } from './models/plugins';
import { PluginAddButton } from './pluginAddButton';
import { PluginToolbar } from './pluginToolbar';

export class EditorPlugin implements Plugin {
  plugin: EditorPluginType;

  addButtons?: PluginAddButton[];

  toolbar?: PluginToolbar;

  static of(plugin: EditorPluginType) {
    return new EditorPlugin(plugin);
  }

  private constructor(plugin: EditorPluginType, modalService?: ModalService) {
    this.initAddButtons(plugin, modalService);
    this.plugin = plugin;
    this.initToolbarButtons(plugin);
  }

  private initAddButtons(plugin, modalService) {
    if (plugin.addButtons) {
      this.addButtons = plugin.addButtons.map(button => PluginAddButton.of(button, modalService));
    }
  }

  private getExtensionName(): string {
    return (this.plugin as TiptapEditorPlugin).tiptapExtensions?.[0]?.name || this.plugin.type;
  }

  private initToolbarButtons(plugin) {
    if (plugin.toolbarButtons) {
      const { buttons, resolvers } = plugin.toolbarButtons;
      this.toolbar = PluginToolbar.of(buttons, resolvers, this.getExtensionName());
    }
  }

  configure(config: Partial<LegacyEditorPluginConfig>) {
    this.plugin.reconfigure?.(config);
  }

  getType(): string {
    return this.plugin.type;
  }

  getTiptapExtensions(): RicosExtension[] {
    return (this.plugin as TiptapEditorPlugin).tiptapExtensions?.map(extension => ({
      ...extension,
      settings: this.getConfig(),
    }));
  }

  getConfig(): LegacyEditorPluginConfig {
    return this.plugin.config;
  }

  getAddButtons(): PluginAddButton[] | undefined {
    return this.addButtons;
  }

  getToolbar(): PluginToolbar | undefined {
    return this.toolbar;
  }

  equals(plugin: Plugin): boolean {
    return this.plugin.type === plugin.getType();
  }
}
