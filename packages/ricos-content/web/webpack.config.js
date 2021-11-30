// import { Configuration } from 'webpack';
const { presets, plugins, env } = require('../../../babel.config.js');
const postCssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevEnvironment = process.env.NODE_ENV === 'development';
const fs = require('fs-extra');

let libEntries = {};
try {
  const libEntriesPath = './lib/';

  fs.readdirSync(`./${libEntriesPath}`).forEach(file => {
    const fileName = file.split('.')[0];
    libEntries = {
      ...libEntries,
      [`lib/${fileName}`]: libEntriesPath + file,
    };
  });
} catch (_) {}

const config = {
  mode: 'development',
  optimization: {
    usedExports: true,
  },
  entry: {
    'es/index': './src/index.ts',
    ...libEntries,
  },
  output: {
    filename: '[name].js',
    library: {
      type: 'commonjs2',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    lodash: 'lodash',
    uuid: 'uuid',
    'ricos-schema': 'ricos-schema',
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isDevEnvironment
                  ? '[path][name]__[local]--[hash:base64:5]'
                  : '[hash:base64:5]',
              },
              importLoaders: 2,
            },
          },
          // Translates CSS into CommonJS

          'postcss-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [...presets, '@babel/preset-typescript'],
              plugins,
              env: {
                commonjs: {
                  presets: [...env.commonjs.presets, '@babel/preset-typescript'],
                  plugins: env.commonjs.plugins,
                },
                test: {
                  presets: [...env.test.presets, '@babel/preset-typescript'],
                  plugins: env.test.plugins,
                },
              },
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
};

const configCjs = {
  ...config,
  entry: {
    'cjs/index': './src/index.ts',
    ...libEntries,
  },
  output: {
    filename: '[name].cjs',
    library: {
      type: 'commonjs',
    },
  },
};

module.exports = [config];
