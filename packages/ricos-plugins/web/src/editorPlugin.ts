import type {
  LegacyEditorPluginConfig,
  EditorPlugin as EditorPluginType,
  ModalService,
} from 'ricos-types';
import type { RicosExtension, TiptapEditorPlugin } from 'ricos-tiptap-types';
import type { Plugin } from './models/plugins';
import { PluginAddButton } from './pluginAddButton';

export class EditorPlugin implements Plugin {
  plugin: EditorPluginType;

  addButtons?: PluginAddButton[];

  static of(plugin: EditorPluginType) {
    return new EditorPlugin(plugin);
  }

  private constructor(plugin: EditorPluginType, modalService?: ModalService) {
    this.initAddButtons(plugin, modalService);
    this.plugin = plugin;
  }

  private initAddButtons(plugin, modalService) {
    if (plugin.addButtons) {
      this.addButtons = plugin.addButtons.map(button => PluginAddButton.of(button, modalService));
    }
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

  equals(plugin: Plugin): boolean {
    return this.plugin.type === plugin.getType();
  }
}
