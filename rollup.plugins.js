'use strict';
const __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.lastEntryPlugins = exports.plugins = void 0;
const path_1 = require('path');
const rollup_1 = __importDefault(require('@svgr/rollup'));
const plugin_node_resolve_1 = __importDefault(require('@rollup/plugin-node-resolve'));
const plugin_alias_1 = __importDefault(require('@rollup/plugin-alias'));
const rollup_plugin_copy_1 = __importDefault(require('rollup-plugin-copy'));
/* @ts-ignore typescript-plugin external types issue */
const plugin_babel_1 = __importDefault(require('@rollup/plugin-babel'));
// const rollup_plugin_typescript2_1 = __importDefault(require('rollup-plugin-typescript2'));
const plugin_commonjs_1 = __importDefault(require('@rollup/plugin-commonjs'));
const plugin_json_1 = __importDefault(require('@rollup/plugin-json'));
const rollup_plugin_postcss_1 = __importDefault(require('rollup-plugin-postcss'));
/* @ts-ignore typescript-plugin external types issue */
const postcss_exclude_files_1 = __importDefault(require('postcss-exclude-files'));
const postcss_url_1 = __importDefault(require('postcss-url'));
/* @ts-ignore typescript-plugin external types issue */
const postcss_rtl_1 = __importDefault(require('postcss-rtl'));
const plugin_replace_1 = __importDefault(require('@rollup/plugin-replace'));
const rollup_plugin_terser_1 = require('rollup-plugin-terser');
const rollup_plugin_visualizer_1 = __importDefault(require('rollup-plugin-visualizer'));
const rollupPlugin_libsPackageJsonGenerator_1 = __importDefault(
  require('./scripts/rollupPlugin-libsPackageJsonGenerator')
);
const fs_1 = require('fs');
const pluginutils_1 = require('@rollup/pluginutils');
const core_1 = require('@babel/core');
const IS_DEV_ENV = process.env.NODE_ENV === 'development';
const resolve = () => {
  return (0, plugin_node_resolve_1.default)({
    preferBuiltins: true,
    extensions: ['.js', '.jsx', '.json'],
  });
};
const resolveAlias = () => {
  return (0, plugin_alias_1.default)({
    entries: {
      'draft-js': '@wix/draft-js',
    },
  });
};
const copy = () => {
  // copyPlugin has a bug with copying folder in writeBundle stage. So it's split up from copyAfterBundleWritten()
  const targets = [{ src: 'statics', dest: 'dist' }];
  return (0, rollup_plugin_copy_1.default)({
    targets,
    copyOnce: true,
  });
};
const copyAfterBundleWritten = () => {
  const targets = [
    // create viewer entry point declaration files
    {
      src: 'dist/src/viewer.d.ts',
      dest: 'dist',
      rename: () => 'module.viewer.d.ts',
      transform: () => "export * from './src/viewer';", // eslint-disable-line quotes
    },
    // create cjs version for viewer entry point declaration files
    {
      src: 'dist/module.viewer.d.ts',
      dest: 'dist',
      rename: () => 'module.viewer.cjs.d.ts',
    },
    {
      src: ['dist/es/*.css'],
      dest: 'dist',
    },
  ];
  return (0, rollup_plugin_copy_1.default)({
    targets,
    copyOnce: true,
    hook: 'writeBundle',
  });
};
const babel = () => {
  const include = ['packages/**/src/**', 'packages/**/lib/**', '**/@tiptap/**'];
  const options = {
    resolve: (0, path_1.resolve)(__dirname),
  };
  return (0, plugin_babel_1.default)({
    configFile: (0, path_1.resolve)(__dirname, 'babel.config.js'),
    filter: (0, pluginutils_1.createFilter)(include, undefined, options),
    extensions: [...core_1.DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    babelHelpers: 'runtime',
  });
};
// const typescript = () => {
//   const absPath = dir => `${process.cwd()}/${dir}`;
//   return (0, rollup_plugin_typescript2_1.default)({
//     useTsconfigDeclarationDir: true,
//     check: true,
//     tsconfig: `${__dirname}/tsconfig.old.json`,
//     tsconfigOverride: {
//       compilerOptions: {
//         declarationDir: absPath('dist'),
//         rootDir: absPath(''),
//         sourceMap: true,
//         allowJs: process.env.ALLOW_JS === 'true',
//       },
//       include: [
//         'src',
//         'src/**/*.json',
//         'src/**/*.scss',
//         'statics/**/*.json',
//         'statics/**/*.schema.json',
//         'statics/**/*.defaults.json',
//         'statics/**/*.scss',
//         'package.json',
//         'lib',
//         'node_modules/@tiptap',
//       ].map(path => absPath(path)),
//       exclude: ['node_modules', '**/*.spec.*'].map(path => absPath(path)),
//     },
//     // debugging options:
//     // verbosity: 3,
//     // clean: true,
//   });
// };
const json = () => {
  return (0, plugin_json_1.default)({
    include: [
      'statics/**',
      'node_modules/**',
      '../../../node_modules/**',
      '../../../packages/**/package.json',
      '../../common/web/dist/statics/schemas/*.schema.json',
      '../../ricos-schema/web/dist/statics/*.defaults.json',
    ],
  });
};
const postcss = shouldExtract => {
  return (0, rollup_plugin_postcss_1.default)({
    minimize: {
      // reduceIdents: false,
      // safe: true,
      /*  @ts-ignore: cssnanoOptions typing is wrong */
      normalizeWhitespace: false,
    },
    modules: {
      generateScopedName: IS_DEV_ENV ? '[name]__[local]___[hash:base64:5]' : '[hash:base64:5]',
      hashPrefix: process.env.MODULE_NAME,
    },
    extract: shouldExtract && 'dist/styles.min.css',
    plugins: [
      (0, postcss_exclude_files_1.default)({
        filter: '**/*.rtlignore.scss',
        plugins: [(0, postcss_rtl_1.default)()],
      }),
      (0, postcss_url_1.default)({
        url: asset => asset.url.replace('../', '/statics/'),
      }),
    ],
  });
};
const replace = () => {
  return (0, plugin_replace_1.default)({
    preventAssignment: true,
    values: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
  });
};
const uglify = () => {
  return (0, rollup_plugin_terser_1.terser)({
    mangle: false,
    output: {
      comments: (node, comment) => {
        return /@preserve|@license|@cc_on|webpackChunkName/i.test(comment.value);
      },
    },
  });
};
const visualizer = () => {
  return (0, rollup_plugin_visualizer_1.default)({
    sourcemap: true,
  });
};
const createFakeStylesFile = () => ({
  name: 'create-fake-styles-file',
  writeBundle() {
    (0, fs_1.writeFileSync)('dist/styles.min.css', '');
  },
});
let _plugins = [
  (0, rollup_1.default)(),
  resolveAlias(),
  resolve(),
  // typescript(),
  babel(),
  (0, plugin_commonjs_1.default)(),
  json(),
];
if (!IS_DEV_ENV) {
  _plugins = [..._plugins, replace(), uglify()];
}
if (process.env.MODULE_ANALYZE_EDITOR || process.env.MODULE_ANALYZE_VIEWER) {
  _plugins = [..._plugins, visualizer()];
}
if (process.env.EXTRACT_CSS === 'false') {
  _plugins = [..._plugins, createFakeStylesFile()];
}
const plugins = shouldExtractCss => {
  _plugins.push(postcss(shouldExtractCss));
  return _plugins;
};
exports.plugins = plugins;
const lastEntryPlugins = [
  (0, rollupPlugin_libsPackageJsonGenerator_1.default)(),
  copy(),
  copyAfterBundleWritten(),
];
exports.lastEntryPlugins = lastEntryPlugins;
