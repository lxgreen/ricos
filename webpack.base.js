// import { Configuration } from 'webpack';
const { presets, plugins, env } = require('./babel.config.js');
const postCssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevEnvironment = process.env.NODE_ENV === 'development';
const fs = require('fs-extra');
const CopyPlugin = require('copy-webpack-plugin');

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
const createBaseConfig = (options = {}) => {
  const skipCSS = !!options.skipCSS;

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
  };

  config.plugins = [];

  config.plugins.push(
    new CopyPlugin({
      patterns: [{ from: 'statics', to: 'statics' }],
    })
  );

  if (skipCSS) {
    // config.plugins.push(
    //   new MiniCssExtractPlugin({
    //     // Options similar to the same options in webpackOptions.output
    //     // all options are optional
    //     filename: '[name].css',
    //     chunkFilename: '[id].css',
    //     ignoreOrder: false, // Enable to remove warnings about conflicting order
    //   })
    // );
  } else {
    config.plugins.push(
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: './styles.min.css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      })
    );
  }

  config.module = {};
  config.module.rules = [
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
          options: {
            projectReferences: true,
          },
        },
      ],
    },
  ];

  if (skipCSS) {
    config.module.rules[0].use.shift();
  }

  return config;
};

const cjsConfig = {
  ...createBaseConfig({ skipCSS: true }),
  entry: {
    'cjs/index': './src/index.ts',
  },
  output: {
    filename: '[name].js',
    library: {
      type: 'commonjs',
    },
  },
};

const esmConfig = {
  ...createBaseConfig({ skipCSS: false }),
  entry: {
    'es/index': './src/index.ts',
  },
  output: {
    filename: '[name].js',
    library: {
      type: 'umd',
    },
  },
};

const configs = [cjsConfig, esmConfig];

if (Object.keys(libEntries).length > 0) {
  const libsConfigCJS = {
    ...createBaseConfig({ skipCSS: true }),
    entry: {
      ...libEntries,
    },
    output: {
      filename: '[name].cjs.js',
      library: {
        type: 'commonjs',
      },
    },
  };
  const libsConfigESM = {
    ...createBaseConfig({ skipCSS: true }),
    entry: {
      ...libEntries,
    },
    output: {
      filename: '[name].js',
      library: {
        type: 'umd',
      },
    },
  };
  configs.push(libsConfigCJS);
  configs.push(libsConfigESM);
}

module.exports = configs;

// [
//   'assert',
//   'axios',
//   'classnames',
//   'lodash',
//   'prop-types',
//   'react',
//   'react-dom',
//   'wix-rich-content-editor-common',
//   'wix-rich-content-common',
//   'wix-rich-content-plugin-commons',
//   'wix-rich-content-ui-components',
//   'wix-rich-content-toolbars-new',
//   'wix-rich-content-toolbars',
//   'i18next',
//   'react-i18next',
//   'react-flip-move',
//   'image-client-api/dist/imageClientSDK',
//   '@wix/draft-js',
//   'draft-js',
//   'downshift',
//   'uuid',
//   /^punycode$/,
//   /^jss$/, //issue with ESM in CJS
//   /^jss-plugin-camel-case$/, //issue with ESM in CJS
//   /^jss-plugin-nested$/, //issue with ESM in CJS
//   /^jss-plugin-props-sort$/, //issue with ESM in CJS
//   /^wix-rich-content-editor$/,
//   /^wix-rich-content-viewer$/,
//   /^ricos-content$/,
//   /^ricos-content\/libs\/toDraftData$/,
//   /^react-player$/,
//   /^@loadable\/component$/,
//   /@babel\/runtime/,
// ]
