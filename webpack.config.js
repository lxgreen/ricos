const path = require('path');
const fs = require('fs-extra');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let libEntries = {};
try {
  const libEntriesPath = './lib/';

  fs.readdirSync(`./${libEntriesPath}`).forEach(file => {
    const fileName = file.split('.')[0];
    libEntries = {
      ...libEntries,
      [`libs/${fileName}`]: libEntriesPath + file,
    };
  });
} catch (_) {}

module.exports = [
  {
    entry: {
      index: './src/index.ts',
      ...libEntries,
    },
    output: {
      filename: 'es/[name].js',
    },

    mode: 'development',
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        { test: /\.tsx?$/, loader: 'ts-loader' },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
  },
  // {
  //   entry: {
  //     index: './src/index.ts',
  //     ...libEntries,
  //   },
  //   output: {
  //     filename: 'cjs/[name].js',
  //   },

  //   mode: 'development',
  //   resolve: {
  //     extensions: ['.tsx', '.ts', '.jsx', '.js'],
  //   },
  //   module: {
  //     rules: [
  //       {
  //         test: /\.s[ac]ss$/i,
  //         use: [
  //           // Creates `style` nodes from JS strings
  //           'style-loader',
  //           // Translates CSS into CommonJS
  //           'css-loader',
  //           // Compiles Sass to CSS
  //           'sass-loader',
  //         ],
  //       },
  //       {
  //         test: /\.(js|jsx|tsx|ts)$/,
  //         exclude: /node_modules/,
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env', '@babel/preset-typescript'],
  //           plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread'],
  //         },
  //       },
  //       {
  //         test: /\.tsx?$/,
  //         loader: 'ts-loader',
  //         options: {
  //           configFile: path.join(__dirname, 'tsconfig.cjs.json'),
  //         },
  //       },
  //     ],
  //   },
  // },
];
module.exports.parallelism = 2;
