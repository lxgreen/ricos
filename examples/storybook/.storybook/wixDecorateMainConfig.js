const webpack = require('webpack');
const {
  StylableWebpackPlugin,
  applyWebpackConfigStylableExcludes,
} = require('@stylable/webpack-plugin');


const patchWithStylablePlugin = (config) => {
  if (config.plugins) {
    config.plugins.push(new StylableWebpackPlugin());
  } else {
    config.plugins = [new StylableWebpackPlugin()];
  }
};

const patchWithSASSConfiguration = config => {
  config.module = {
    ...config.module,
    rules: [
      ...(config.module?.rules || []),
      {
        test: /\.s[ca]ss$/,
        exclude: /\.global\.s[ca]ss$/,
        use: [
          { loader: require.resolve('style-loader') },
          {
            loader: require.resolve('css-loader'),
            options: { modules: true, import: true },
          },
          { loader: require.resolve('sass-loader') },
        ],
      },
      {
        test: /\.global\.s[ca]ss$/,
        rules: [
          { loader: require.resolve('style-loader') },
          {
            loader: require.resolve('css-loader'),
            options: { modules: false, import: true },
          },
          { loader: require.resolve('sass-loader') },
        ],
      },
    ],
  };
};

const decorateMainConfig = ({
  webpackFinal = config => config,
  addons = [],
  stories,
  ...rest
}) => ({
  core: {
    builder: 'webpack5',
  },
  stories,
  webpackFinal: config => {
    patchWithStylablePlugin(config);
    patchWithSASSConfiguration(config);
    applyWebpackConfigStylableExcludes(config);
    return webpackFinal(config);
  },
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { docs: false, controls: false, toolbars: false },
    },
    ...addons,
  ],
  ...rest,
});

module.exports = { decorateMainConfig };
