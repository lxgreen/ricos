/* eslint-disable */

import { readdirSync, existsSync } from 'fs';
import path from 'path';
import { cloneDeep } from 'lodash';
import { plugins as createPlugins, lastEntryPlugins } from './rollup.plugins';
import { isExternal as external } from './rollup.externals';
import { RollupOptions, OutputOptions, WatcherOptions } from 'rollup';
import { getPackages } from '@lerna/project';
import { filterPackages } from '@lerna/filter-packages';
import batchPackages from '@lerna/batch-packages';
/**
 * @param {string}[scope] - packages to only build (if you don't
 *    want to build everything)
 * @param {string}[ignore] - packages to not build
 *
 * @returns {string[]} - sorted list of Package objects that
 *    represent packages to be built.
 */
async function getSortedPackages(scope, ignore) {
  const packages = await getPackages(__dirname);
  const filtered = filterPackages(packages, scope, ignore, false);

  return batchPackages(filtered).reduce((arr, batch) => arr.concat(batch), []);
}

// if (!process.env.MODULE_NAME) {
//   console.error('Environment variable "MODULE_NAME" is missing!');
//   process.exit(1);
// }
let result = [];
const commonConfig = async (
  output: OutputOptions[],
  shouldExtractCss: boolean
  // @ts-ignore
): RollupOptions[] => {
  const plugins = createPlugins(shouldExtractCss);
  const watch: WatcherOptions = {
    exclude: ['node_modules/**'],
    clearScreen: false,
  };
  const commonOptions = {
    plugins,
    external,
    watch,
  };

  const packages = await getSortedPackages('', 'wix-rich-content-@(test-env|example|storybook)');

  packages.forEach(pkg => {
    const basePath = path.relative(__dirname, pkg.location);
    const fixEntry = (entry: RollupOptions): RollupOptions => {
      // @ts-ignore
      entry.input = path.join(basePath, entry.input);
      const fixOutputOption = o => {
        if (o.dir) o.dir = path.join(basePath, o.dir);
        if (o.file) o.file = path.join(basePath, o.file);
      };
      // @ts-ignore
      if (entry.output?.file || entry.output?.dir) {
        fixOutputOption(entry.output);
      } else {
        // @ts-ignore
        entry.output.forEach(fixOutputOption);
      }
      return entry;
    };

    output = output.map(o => ({ ...o, sourcemap: true }));
    if (process.env.MODULE_WATCH && !process.env.BUILD_CJS) {
      output = output.filter(o => o.format === 'es');
    }

    let addPartToFilename = (fileName: string, fileNamePart: string) => {
      const anchor = fileName.indexOf('.');
      fileName = `${fileName.slice(0, anchor)}.${fileNamePart}${fileName.slice(anchor)}`;
      return fileName;
    };

    const editorEntry: RollupOptions = {
      input: 'src/index.ts',
      output: cloneDeep(output),
      ...commonOptions,
    };

    const libEntries: RollupOptions[] = [];
    try {
      let libEntriesPath = 'lib/';

      readdirSync(`${basePath}/${libEntriesPath}`).forEach(file => {
        const fileName = file.split('.')[0];
        libEntries.push({
          input: libEntriesPath + file,
          output: output.map(({ format }) => ({
            format,
            file: `dist/lib/${fileName}${format === 'cjs' ? '.cjs.js' : '.js'}`,
          })),
          ...commonOptions,
        });
      });
    } catch (_) {}

    let viewerEntry: RollupOptions[] = [];
    const viewerPath = 'src/viewer.ts';
    if (existsSync(`${basePath}/${viewerPath}`)) {
      viewerEntry.push({
        input: viewerPath,
        output: cloneDeep(output).map(o => {
          if (o.file) {
            o.file = addPartToFilename(o.file, 'viewer');
          }
          return o;
        }),
        ...commonOptions,
      });
    }

    const viewerLoadableOutput: OutputOptions[] = [
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

    const viewerLoadablePath = 'src/viewer-loadable.ts';
    if (existsSync(`${basePath}/${viewerLoadablePath}`)) {
      viewerEntry.push({
        input: viewerLoadablePath,
        output: viewerLoadableOutput,
        ...commonOptions,
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
        ...commonOptions,
        external: source => ['lodash', 'react', 'react-dom'].includes(source),
      });
    }
    const lastEntry = entries[entries.length - 1];
    lastEntry.plugins = [...lastEntry.plugins, ...lastEntryPlugins];
    // @ts-ignore
    result = [...result, ...entries.filter(x => x).map(fixEntry)];
  });
  return result;
};

const output: OutputOptions[] = process.env.DYNAMIC_IMPORT
  ? [
      {
        dir: 'dist/es',
        format: 'es',
      },
      {
        dir: 'dist/cjs/',
        format: 'cjs',
      },
    ]
  : [
      {
        file: 'dist/module.js',
        format: 'es',
      },
      {
        file: 'dist/module.cjs.js',
        format: 'cjs',
      },
    ];

export default commonConfig(output, process.env.EXTRACT_CSS !== 'false');
