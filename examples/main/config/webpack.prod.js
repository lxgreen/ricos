/* eslint-disable */
const merge = require('webpack-merge').merge;
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
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
          target: 'esnext',
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
      new TerserPlugin({ minify: TerserPlugin.esbuildMinify }),
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.esbuildMinify,
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
