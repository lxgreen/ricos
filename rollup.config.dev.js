import { resolve as pathResolve } from 'path';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { createFilter } from '@rollup/pluginutils';
import babelPlugin from '@rollup/plugin-babel';
import commonjsPlugin from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import jsonPlugin from '@rollup/plugin-json';
import multiInput from 'rollup-plugin-multi-input';
import postcssPlugin from 'rollup-plugin-postcss';
import resolvePlugin from '@rollup/plugin-node-resolve';
import aliasPlugin from '@rollup/plugin-alias';

const resolve = () => {
  return resolvePlugin({
    preferBuiltins: true,
    extensions: ['.js', '.jsx', '.json'],
  });
};

const resolveAlias = () => {
  return aliasPlugin({
    entries: {
      'draft-js': '@wix/draft-js',
    },
  });
};

const ts = () => {
  const absPath = dir => `${process.cwd()}/${dir}`;
  return typescript({
    useTsconfigDeclarationDir: true,
    check: true,
    tsconfig: `${__dirname}/tsconfig.json`,
    tsconfigOverride: {
      include: [
        'src',
        'src/**/*.json',
        'src/**/*.scss',
        'statics/**/*.json',
        'statics/**/*.schema.json',
        'statics/**/*.defaults.json',
        'statics/**/*.scss',
        'package.json',
        'lib',
        'node_modules/@tiptap',
      ].map(path => absPath(path)),
      exclude: ['node_modules', '**/*.spec.*'].map(path => absPath(path)),
    },
  });
};

const babel = () => {
  const include = ['packages/**/src/**', 'packages/**/lib/**', '**/@tiptap/**'];
  const options = {
    resolve: pathResolve(__dirname),
  };
  return babelPlugin({
    configFile: pathResolve(__dirname, 'babel.config.js'),
    filter: createFilter(include, undefined, options),
    extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    babelHelpers: 'runtime',
  });
};

const json = () => {
  return jsonPlugin({
    include: [
      'statics/**',
      'node_modules/**',
      'packages/**/package.json',
      'packages/common/web/statics/schemas/*.schema.json',
      'packages/ricos-schema/web/dist/statics/*.defaults.json',
    ],
  });
};

export default {
  input: ['./packages/ricos-content/web/src/index.ts'],
  output: {
    dir: 'dist',
    format: 'iife',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      lodash: '_',
    },
  },

  external: source => ['lodash', 'react', 'react-dom'].includes(source),
  plugins: [
    resolveAlias(),
    resolve(),
    ts(),
    babel(),
    commonjsPlugin(),
    json(),
    postcssPlugin(),
    multiInput(),
  ],
};
