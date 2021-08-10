const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const LoadablePlugin = require('@loadable/webpack-plugin');
const path = require('path');

const DIST_PATH = path.resolve(__dirname, 'public/dist');

const babelRule = {
  test: /\.js(x)?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      compact: true,
      rootMode: 'upward',
    },
  },
};

const scssRule = topLoader => ({
  test: /\.scss$/,
  use: [
    topLoader,
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
});

const urlRule = {
  test: /\.(woff|eot|ttf|svg|woff2)$/,
  issuer: /\.(s)?css$/,
  use: ['url-loader'],
};

const typescriptRule = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  loader: 'happypack/loader?id=ts',
};

const happyPackPlugin = new HappyPack({
  id: 'ts',
  loaders: [
    {
      path: 'ts-loader',
      query: { happyPackMode: true },
    },
  ],
});

const getOutput = target => ({
  path: path.join(DIST_PATH, target),
  filename: '[name].bundle.js',
  publicPath: `/dist/${target}/`,
});

const common = {
  mode: 'development',
  devtool: 'eval-source-map',
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
  },
  plugins: [
    new LoadablePlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    happyPackPlugin,
  ],
};

const config = [
  {
    ...common,
    name: 'client',
    entry: {
      index: './src/client/index',
    },
    output: getOutput('client'),
    module: {
      rules: [
        babelRule,
        scssRule({
          loader: 'style-loader',
        }),
        urlRule,
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        typescriptRule,
      ],
    },
  },
  {
    ...common,
    name: 'server',
    entry: {
      renderer: './src/server/renderer',
    },
    output: {
      ...getOutput('server'),
      libraryTarget: 'commonjs2',
    },
    target: 'node',
    externals: ['@loadable/component', nodeExternals({ whitelist: [/.css/, /^wix-rich-content/] })],
    module: {
      rules: [
        babelRule,
        scssRule(MiniCssExtractPlugin.loader),
        urlRule,
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        typescriptRule,
      ],
    },
    node: {
      __dirname: false,
    },
  },
];

module.exports = config;
