import { resolve as pathResolve } from 'path';
import svgr from '@svgr/rollup';
import resolvePlugin from '@rollup/plugin-node-resolve';
import aliasPlugin from '@rollup/plugin-alias';
import copyPlugin from 'rollup-plugin-copy';
/* @ts-ignore typescript-plugin external types issue */
import babelPlugin from '@rollup/plugin-babel';
import typescriptPlugin from 'rollup-plugin-typescript2';
import commonjsPlugin from '@rollup/plugin-commonjs';
import jsonPlugin from '@rollup/plugin-json';
import postcssPlugin from 'rollup-plugin-postcss';
/* @ts-ignore typescript-plugin external types issue */
import postcssExclude from 'postcss-exclude-files';
import postcssURL from 'postcss-url';
/* @ts-ignore typescript-plugin external types issue */
import postcssRTL from 'postcss-rtl';
import replacePlugin from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import visualizerPlugin from 'rollup-plugin-visualizer';
import { Plugin } from 'rollup';
import libsPackageJsonGeneratorPlugin from './scripts/rollupPlugin-libsPackageJsonGenerator';
import fs, { writeFileSync } from 'fs';
import { createFilter } from '@rollup/pluginutils';
import { DEFAULT_EXTENSIONS } from '@babel/core';

const IS_DEV_ENV = process.env.NODE_ENV === 'development';
const editorExtractedStylePath = 'dist/styles.min.global.css';
const viewerExtractedStylePath = 'dist/styles.viewer.min.global.css';

const resolve = (): Plugin => {
  return resolvePlugin({
    preferBuiltins: true,
    extensions: ['.js', '.jsx', '.json'],
  });
};

const resolveAlias = (): Plugin => {
  return aliasPlugin({
    entries: {
      'draft-js': '@wix/draft-js',
    },
  });
};

const copy = (): Plugin => {
  // copyPlugin has a bug with copying folder in writeBundle stage. So it's split up from copyAfterBundleWritten()
  const targets = [{ src: 'statics', dest: 'dist' }];
  return copyPlugin({
    targets,
    copyOnce: true,
  });
};

const copyAfterBundleWritten = (): Plugin => {
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

  return copyPlugin({
    targets,
    copyOnce: true,
    hook: 'writeBundle',
  });
};

const babel = (): Plugin => {
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

const typescript = (): Plugin => {
  const absPath = (dir: string) => `${process.cwd()}/${dir}`;
  return typescriptPlugin({
    useTsconfigDeclarationDir: true,
    check: true,
    tsconfig: `${__dirname}/tsconfig.json`,
    tsconfigOverride: {
      compilerOptions: {
        declarationDir: absPath('dist'),
        rootDir: absPath(''),
        sourceMap: true,
      },
      include: [
        'src',
        'src/**/*.json',
        'src/**/*.scss',
        'statics/**/*.json',
        'statics/**/*.schema.json',
        'statics/**/*.scss',
        'package.json',
        'lib',
        'node_modules/@tiptap',
      ].map(path => absPath(path)),
      exclude: ['node_modules', '**/*.spec.*'].map(path => absPath(path)),
    },
    // debugging options:
    // verbosity: 3,
    // clean: true,
  });
};

const json = (): Plugin => {
  return jsonPlugin({
    include: [
      'statics/**',
      'node_modules/**',
      '../../../node_modules/**',
      '../../../packages/**/package.json',
      '../../common/web/dist/statics/schemas/*.schema.json',
    ],
  });
};

const postcss = (shouldExtract: boolean, viewer?: boolean): Plugin => {
  return postcssPlugin({
    minimize: {
      // reduceIdents: false,
      // safe: true,
      /*  @ts-ignore: cssnanoOptions typing is wrong */
      normalizeWhitespace: false,
    },
    modules: {
      generateScopedName: IS_DEV_ENV ? '[name]__[local]___[hash:base64:5]' : '[hash:base64:5]',
    },
    extract: shouldExtract && (viewer ? viewerExtractedStylePath : editorExtractedStylePath),
    plugins: [
      postcssExclude({
        filter: '**/*.rtlignore.scss',
        plugins: [postcssRTL()],
      }),
      postcssURL({
        url: asset => asset.url.replace('../', '/statics/'),
      }),
    ],
  });
};

const replace = (): Plugin => {
  return replacePlugin({
    preventAssignment: true,
    values: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
  });
};

const uglify = (): Plugin => {
  return terser({
    mangle: false,
    output: {
      comments: (node, comment) => {
        return /@preserve|@license|@cc_on|webpackChunkName/i.test(comment.value);
      },
    },
  });
};

const visualizer = (): Plugin => {
  return visualizerPlugin({
    sourcemap: true,
  });
};

const createFakeStylesFile = (): Plugin => ({
  name: 'create-fake-styles-file',
  writeBundle() {
    writeFileSync('dist/styles.min.css', '');
  },
});

function addStylesImport() {
  return {
    name: 'add-style-import',
    writeBundle() {
      const packageJson = require(process.cwd() + '/package.json');
      const packageName = packageJson.name;

      const getExtractedCssCjsFile = path => `require('${packageName}/${path}')`;
      const getExtractedCssEsFile = path => `import '${packageName}/${path}'`;

      const writeContent = (path, content) => {
        if (fs.existsSync(path)) {
          const code = fs.readFileSync(path, 'utf8');
          const result = code.includes(content) ? code : `${content};\n` + code;
          fs.writeFileSync(path, result, 'utf8');
        }
      };

      const isExistEditorStyles = fs.existsSync(editorExtractedStylePath);
      const isExistViewerStyles = fs.existsSync(viewerExtractedStylePath);

      if (isExistEditorStyles) {
        writeContent(packageJson.module, getExtractedCssEsFile(editorExtractedStylePath));
        writeContent(packageJson.main, getExtractedCssCjsFile(editorExtractedStylePath));
      }
      if (isExistViewerStyles) {
        let loadablePackageJson;
        try {
          loadablePackageJson = require(process.cwd() + '/loadable/viewer/package.json');
        } catch {}

        const extactedCssCjsPath = getExtractedCssCjsFile(viewerExtractedStylePath);
        const extactedCssEsPath = getExtractedCssEsFile(viewerExtractedStylePath);

        writeContent('dist/module.viewer.js', extactedCssEsPath);
        writeContent('dist/module.viewer.cjs.js', extactedCssCjsPath);
        if (loadablePackageJson) {
          writeContent(loadablePackageJson.module.match(/dist.*/)[0], extactedCssEsPath);
          writeContent(loadablePackageJson.main.match(/dist.*/)[0], extactedCssCjsPath);
        }
      }

      (isExistEditorStyles || isExistViewerStyles) && writeFileSync('dist/styles.min.css', '');
    },
  };
}

let plugins: Plugin[] = [
  svgr(),
  resolveAlias(),
  resolve(),
  typescript(),
  babel(),
  commonjsPlugin(),
  json(),
];

if (!IS_DEV_ENV) {
  plugins = [...plugins, replace(), uglify()];
}

if (process.env.MODULE_ANALYZE_EDITOR || process.env.MODULE_ANALYZE_VIEWER) {
  plugins = [...plugins, visualizer()];
}

if (process.env.EXTRACT_CSS === 'false') {
  plugins = [...plugins, createFakeStylesFile()];
}

const lastEntryPlugins = [
  libsPackageJsonGeneratorPlugin(),
  copy(),
  copyAfterBundleWritten(),
  addStylesImport(),
];
export { plugins, postcss, lastEntryPlugins };
