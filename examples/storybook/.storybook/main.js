const { decorateMainConfig } = require('./wixDecorateMainConfig');

const config = {
  stories: async () => ['../stories/*/index.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-interactions'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
  },
  framework: '@storybook/react',
  webpackFinal: async config => {
    config.module.rules.push({
      resourceQuery: /raw/,
      type: 'asset/source',
    });
    return config;
  },
};

module.exports = decorateMainConfig(config);
