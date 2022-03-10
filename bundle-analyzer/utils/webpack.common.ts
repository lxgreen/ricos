import type { Configuration, WebpackPluginInstance } from 'webpack';
import path from 'path';
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const rules = [
  {
    test: /\.js(x)?$/,
    include: path.resolve(__dirname, '../src'),
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react'],
      },
    },
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          insert: 'top',
        },
      },
      'css-loader',
    ],
  },
  {
    test: /\.scss$/,
    exclude: /styles\.global\.scss/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: '[name]_[local]',
          },
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
  },
  {
    test: /\.tsx?$/,
    include: path.resolve(__dirname, '../src'),
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
];
export const getWebpackConfig = (
  entry: string | Record<string, string>,
  plugins?: WebpackPluginInstance[]
): Configuration => {
  return {
    entry,
    mode: 'production',
    output: {
      filename: `[name].js`,
      // eslint-disable-next-line no-path-concat
      path: __dirname + '/dist',
    },
    module: {
      rules,
    },
    plugins,
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      lodash: '_',
      i18next: 'i18next',
      'react-i18next': 'react-i18next',
      'regenerator-runtime': 'regenerator-runtime',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2015', // Syntax to compile to (see options below for possible values)
        }),
      ],
    },
  };
};
