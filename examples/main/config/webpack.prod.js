/* eslint-disable */
const merge = require('webpack-merge').merge;
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {
  mode: 'production',
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
      {
        test: /\.scss$/,
        exclude: /styles\.global\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015', // Syntax to compile to (see options below for possible values)
        css: true, // Apply minification to CSS assets
      }),
    ],
  },
};

module.exports = env => {
  if (env && env.analyzeBundle) {
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
  }
  const common = require('./webpack.common.js')(env);
  common.module.rules = common.module.rules.filter(
    rule => rule.test && rule.test.toString() !== /\.scss$/.toString()
  );
  return merge(common, prodConfig);
};
