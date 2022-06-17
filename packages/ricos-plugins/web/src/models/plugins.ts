import type { RicosExtension } from 'ricos-tiptap-types';
import type { LegacyEditorPluginConfig, EditorPlugin as EditorPluginType } from 'ricos-types';
import type { PluginAddButton, PluginAddButtons } from '../pluginAddButton';
import type { PluginToolbar } from '../pluginToolbar';

/**
 * Represents a plugin in Ricos Editor.
 * Admits config, modals, tiptap extensions, add buttons and toolbar buttons.
 *
 * @export
 * @interface Plugin
 */
export interface Plugin {
  /**
   * Plugin's type
   *
   * @returns  {string}
   * @memberof Plugin
   */
  getType(): string;
  /**
   * Plugin's Tiptap extensions
   *
   * @returns  {RicosExtension}
   * @memberof Plugin
   */
  getTiptapExtensions?: () => RicosExtension[];
  /**
   * Plugin config
   *
   * @returns  {LegacyEditorPluginConfig}
   * @memberof Plugin
   */
  getConfig(): LegacyEditorPluginConfig;
  /**
   * Add Buttons
   *
   * @returns  {PluginAddButtons}
   * @memberof Plugin
   */
  getAddButtons(): PluginAddButton[] | undefined;
  /**
   * Toolbar Buttons
   *
   * @returns  {PluginToolbar}
   * @memberof Plugin
   */
  getToolbar(): PluginToolbar | undefined;
  /**
   * Determines whether plugin equals to another plugin, based on type
   *
   * @param {Plugin} plugin
   * @returns  {boolean}
   * @memberof Plugin
   */
  equals(plugin: Plugin): boolean;
  /**
   * Reconfigure Plugin
   *
   * @param {Partial<LegacyEditorPluginConfig>} config
   * @memberof Plugin
   */
  configure(config: Partial<LegacyEditorPluginConfig>); // runtime configuration
}

/**
 * Aggregate over Plugin entity.
 * Responsible for plugin validation.
 *
 * @export
 * @interface Plugins
 */
export interface Plugins {
  /**
   * Registers plugin, validates it has no conflicts.
   *
   * @memberof Plugins
   */
  register: (plugin: EditorPluginType) => void;
  /**
   * Removes plugin
   *
   * @memberof Plugins
   */
  unregister: (plugin: Plugin) => void;
  /**
   * Removes all plugins
   *
   * @memberof Plugins
   */
  destroy: () => Plugins;
  /**
   * Filters plugins according to predicate
   *
   * @memberof Plugins
   */
  filter: (predicate: (plugin: Plugin) => boolean) => Plugins;
  /**
   * Gets plugin array
   *
   * @memberof Plugins
   */
  asArray: () => Plugin[];
  /**
   * Plugins add Buttons
   *
   * @returns  {PluginAddButtons}
   * @memberof Plugin
   */
  getAddButtons(): PluginAddButtons | undefined;
  /**
   * Plugins toolbar Buttons
   *
   * @returns  {PluginsToolbar}
   * @memberof Plugins
   */
  getVisibleToolbar(content): PluginToolbar | undefined;
  /**
   * Plugins tiptap extensions
   *
   * @returns  {PluginAddButtons}
   * @memberof Plugin
   */
  getTiptapExtensions?: () => RicosExtension[];
  /**
   * Reconfigure Plugin
   *
   * @param {string} type
   * @param {Partial<LegacyEditorPluginConfig>} config
   * @memberof Plugin
   */
  configure(config: Partial<LegacyEditorPluginConfig>); // runtime configuration
}
