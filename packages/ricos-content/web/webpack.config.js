// import { Configuration } from 'webpack';
const { presets, plugins, env } = require('../../../babel.config.js');

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
      type: 'umd',
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
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              // plugins: [
              //   '@babel/proposal-class-properties',
              //   '@babel/proposal-object-rest-spread',
              //   '@babel/plugin-transform-modules-commonjs',
              // ],
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

module.exports = [config, configCjs];
