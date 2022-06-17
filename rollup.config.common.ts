/* eslint-disable */

import { readdirSync, existsSync } from 'fs';
import { cloneDeep } from 'lodash';
import { plugins, postcss, addStylesImport, lastEntryPlugins } from './rollup.plugins';
import { isExternal as external } from './rollup.externals';
import type { RollupOptions, OutputOptions, WatcherOptions } from 'rollup';

if (!process.env.MODULE_NAME) {
  console.error('Environment variable "MODULE_NAME" is missing!');
  process.exit(1);
}

const commonConfig = (output: OutputOptions[], shouldExtractCss: boolean): RollupOptions[] => {
  const onlyCurrentPackageRegex = new RegExp(`/${process.env.MODULE_NAME}/`);
  const watch: WatcherOptions = {
    // exclude: ['node_modules/**'],
    include: [onlyCurrentPackageRegex],
    clearScreen: false,
  };
  const getCommonOptions = (entry?: string) => ({
    plugins: [...plugins, postcss(shouldExtractCss, entry), addStylesImport()],
    external,
    watch,
  });

  output = output.map(o => ({ ...o, sourcemap: true }));

  let addPartToFilename = (fileName: string, fileNamePart: string) => {
    const anchor = fileName.indexOf('.');
    fileName = `${fileName.slice(0, anchor)}.${fileNamePart}${fileName.slice(anchor)}`;
    return fileName;
  };

  const editorEntry: RollupOptions = {
    input: 'src/index.ts',
    output: cloneDeep(output),
    ...getCommonOptions(),
  };

  const libEntries: RollupOptions[] = [];
  try {
    let libEntriesPath = 'lib/';

    readdirSync(`./${libEntriesPath}`).forEach(file => {
      const fileName = file.split('.')[0];
      libEntries.push({
        input: libEntriesPath + file,
        output: output.map(({ format }) => ({
          format,
          file: `dist/lib/${fileName}${format === 'cjs' ? '.cjs.js' : '.js'}`,
        })),
        ...getCommonOptions(fileName),
      });
    });
  } catch (_) {}

  let viewerEntry: RollupOptions[] = [];
  const viewerPath = 'src/viewer.ts';
  if (existsSync(`./${viewerPath}`)) {
    viewerEntry.push({
      input: viewerPath,
      output: cloneDeep(output).map(o => {
        if (o.file) {
          o.file = addPartToFilename(o.file, 'viewer');
        }
        return o;
      }),
      ...getCommonOptions('viewer'),
    });
  }

  const viewerLoadablePath = 'src/viewer-loadable.ts';
  if (existsSync(`./${viewerLoadablePath}`)) {
    viewerEntry.push({
      input: viewerLoadablePath,
      output: viewerLoadableOutput,
      ...getCommonOptions('viewer'),
    });
  }

  let entries;
  if (process.env.MODULE_ANALYZE_EDITOR) {
    entries = [editorEntry, ...libEntries];
  } else if (process.env.MODULE_ANALYZE_VIEWER) {
    entries = [...viewerEntry, ...libEntries];
  } else {
    entries = [editorEntry, ...viewerEntry, ...libEntries];
  }

  const mobileNativeLoaderPath = 'src/mobileNativeLoader.js';
  if (existsSync(`./${mobileNativeLoaderPath}`)) {
    entries.push({
      input: mobileNativeLoaderPath,
      output: {
        file: 'dist/mobileNativeLoader.js',
        format: 'iife',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          lodash: '_',
        },
      },
      ...getCommonOptions('mobile'),
      external: source => ['lodash', 'react', 'react-dom'].includes(source),
    });
  }
  const lastEntry = entries[entries.length - 1];
  lastEntry.plugins = [...lastEntry.plugins, ...lastEntryPlugins];
  return entries.filter(x => x);
};

let viewerLoadableOutput: OutputOptions[] = [
  {
    dir: 'dist/loadable/viewer/es/',
    format: 'es',
    chunkFileNames: '[name].js',
  },
  {
    dir: 'dist/loadable/viewer/cjs/',
    format: 'cjs',
    chunkFileNames: '[name].cjs.js',
  },
];

let output: OutputOptions[] = process.env.DYNAMIC_IMPORT
  ? [
      {
        dir: 'dist/es',
        format: 'es',
        exports: 'auto',
      },
      {
        dir: 'dist/cjs/',
        format: 'cjs',
        exports: 'auto',
      },
    ]
  : [
      {
        file: 'dist/module.js',
        format: 'es',
        exports: 'auto',
      },
      {
        file: 'dist/module.cjs.js',
        format: 'cjs',
        exports: 'auto',
      },
    ];

if (process.env.ROLLUP_WATCH && !process.env.BUILD_CJS) {
  output = output.filter(o => o.format === 'es');
  viewerLoadableOutput = viewerLoadableOutput.filter(o => o.format === 'es');
}

export default commonConfig(output, process.env.EXTRACT_CSS !== 'false');
