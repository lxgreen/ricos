import type { RicosEditorProps } from 'ricos-common';

export default function pluginsConfigMerger(
  plugins: RicosEditorProps['plugins'],
  _rcProps: RicosEditorProps['_rcProps']
): RicosEditorProps['plugins'] {
  const { config } = _rcProps || {};
  if (!config) {
    return plugins;
  }

  const types = Object.keys(config);
  const pluginsWithStrategy =
    plugins
      ?.filter(plugin => types.includes(plugin.type))
      ?.map(plugin => ({
        ...plugin,
        config: { ...plugin.config, ...config[plugin.type] },
      })) || [];
  const pluginsWithoutStrategy = plugins?.filter(plugin => !types.includes(plugin.type)) || [];

  return [...pluginsWithStrategy, ...pluginsWithoutStrategy];
}
