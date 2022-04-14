const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');
const esbuild = require('esbuild');

const monorepo_root = path.join(__dirname, '..', '..');

const output = {
  path: path.resolve(__dirname, 'dist/'),
  filename: '[name].bundle.js',
  chunkFilename: '[chunkhash].bundle.js',
  publicPath: '/',
};

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
    splitChunks: {
      automaticNameDelimiter: '~',
    },
  },
};

const jsRule = {
  test: /\.js$/,
  include: path.resolve(__dirname, 'src'),
  loader: 'esbuild-loader',
  options: {
    loader: 'jsx',
    target: 'esnext',
    implementation: esbuild,
  },
};

const tsRule = {
  test: /\.tsx?$/,
  loader: 'esbuild-loader',
  options: {
    loader: 'tsx',
    target: 'esnext',
    implementation: esbuild,
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

const commonPlugins = [
  new DotenvWebpackPlugin({
    path: path.resolve(monorepo_root, '.env'),
  }),
];

const clientConfig = {
  ...common,
  name: 'client',
  entry: {
    index: './src/client/index',
  },
  output,
  plugins: [...commonPlugins],
  module: {
    rules: [
      jsRule,
      tsRule,
      scssRule({
        loader: 'style-loader',
      }),
      urlRule,
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

const serverConfig = {
  ...common,
  name: 'server',
  entry: {
    renderer: './src/server/renderer',
  },
  output: {
    ...output,
    libraryTarget: 'commonjs2',
    publicPath: '/static/',
  },
  target: 'node',
  externals: [nodeExternals({ allowlist: [/.css/, /^wix-rich-content/, /^ricos-/] })],
  plugins: [
    ...commonPlugins,
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      jsRule,
      tsRule,
      scssRule(MiniCssExtractPlugin.loader),
      urlRule,
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};

const config = [clientConfig, serverConfig];

module.exports = config;
