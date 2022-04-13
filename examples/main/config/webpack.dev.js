/* eslint-disable */
const path = require('path');
const merge = require('webpack-merge').merge;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const PATHS = {
  monorepo_root: path.join(__dirname, '..', '..', '..'),
};

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'es6',
        },
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer: {
    port: 3000,
    open: true,
    host: 'localhost',
    compress: true,
    allowedHosts: 'all',
    proxy: {
      '/_serverless/*': {
        target: 'https://www.wix.com/',
        secure: false,
        changeOrigin: true,
      },
      '/rich-content/oembed': 'http://stehauho.wixsite.com/',
    },
  },
};

module.exports = env => {
  const common = require('./webpack.common.js')(env);
  return merge(common, devConfig);
};
