import { EditorPlugin } from './editorPlugin';
import { PluginAddButtons } from './pluginAddButton';
import type { PluginToolbar } from './pluginToolbar';
import type { Plugins, Plugin } from './models/plugins';
import type { EditorPlugin as EditorPluginType, LegacyEditorPluginConfig } from 'ricos-types';
import { compact } from 'lodash';
import type { RicosExtension } from 'ricos-tiptap-types';

export class PluginCollisionError extends Error {}

export class EditorPlugins implements Plugins {
  private plugins: Plugin[] = [];

  private hasDuplicate(plugin: Plugin) {
    return this.plugins.find(p => p.equals(plugin));
  }

  register(plugin: EditorPluginType) {
    const candidate = EditorPlugin.of(plugin);

    const duplicate = this.hasDuplicate(candidate);
    if (duplicate) {
      throw new PluginCollisionError(
        `the plugin ${candidate.getType()} conflicts with ${duplicate.getType()}`
      );
    }

    this.plugins.push(candidate);
  }

  unregister(plugin: Plugin): EditorPlugins {
    return this.filter(p => !p.equals(plugin));
  }

  destroy(): EditorPlugins {
    this.plugins = [];
    return this;
  }

  filter(predicate: (plugin: Plugin) => boolean): EditorPlugins {
    this.plugins = this.plugins.filter(predicate);
    return this;
  }

  asArray() {
    return this.plugins;
  }

  getConfig(type: string) {
    return this.plugins.filter(plugin => plugin.getType() === type)[0]?.getConfig() || {};
  }

  configure(config: Partial<LegacyEditorPluginConfig>) {
    return this.plugins.forEach(plugin => plugin.configure(config));
  }

  getAddButtons() {
    //maybe use filter class func
    const addButtons = this.plugins.reduce(
      (prev, curr) => [...prev, ...(curr.getAddButtons() || [])],
      []
    );
    return new PluginAddButtons(addButtons);
  }

  getVisibleToolbar(content) {
    const toolbar: PluginToolbar = this.plugins
      .map(plugin => plugin.getToolbar())
      .filter(
        (toolbar: PluginToolbar | undefined): toolbar is PluginToolbar =>
          !!toolbar?.isVisible(content)
      )[0];
    return toolbar;
  }

  getTiptapExtensions(): RicosExtension[] {
    return compact(this.plugins.flatMap(plugin => plugin.getTiptapExtensions?.() || []));
  }
}
