'use strict';
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const lodash_1 = require("lodash");
const rollup_plugins_1 = require("./rollup.plugins");
const rollup_externals_1 = require("./rollup.externals");
if (!process.env.MODULE_NAME) {
    console.error('Environment variable "MODULE_NAME" is missing!');
    process.exit(1);
}
const commonConfig = (output, shouldExtractCss) => {
    const plugins = (0, rollup_plugins_1.plugins)(shouldExtractCss);
    const watch = {
        exclude: ['node_modules/**'],
        clearScreen: false,
    };
    const commonOptions = {
        plugins,
        external: rollup_externals_1.isExternal,
        watch,
    };
    output = output.map(o => ({ ...o, sourcemap: false }));
    if (process.env.MODULE_WATCH && !process.env.BUILD_CJS) {
        output = output.filter(o => o.format === 'es');
    }
    let addPartToFilename = (fileName, fileNamePart) => {
        const anchor = fileName.indexOf('.');
        fileName = `${fileName.slice(0, anchor)}.${fileNamePart}${fileName.slice(anchor)}`;
        return fileName;
    };
    const editorEntry = {
        input: 'dist/src/index.js',
        output: (0, lodash_1.cloneDeep)(output),
        ...commonOptions,
    };
    const libEntries = [];
    try {
        let libEntriesPath = 'dist/lib/';
        (0, fs_1.readdirSync)(`./${libEntriesPath}`)
            .filter(file => !file.endsWith('.map'))
            .filter(file => !file.endsWith('.ts'))
            .forEach(file => {
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
    }
    catch (_) { }
    let viewerEntry = [];
    const viewerPath = 'temp/viewer.ts';
    if ((0, fs_1.existsSync)(`./${viewerPath}`)) {
        viewerEntry.push({
            input: viewerPath,
            output: (0, lodash_1.cloneDeep)(output).map(o => {
                if (o.file) {
                    o.file = addPartToFilename(o.file, 'viewer');
                }
                return o;
            }),
            ...commonOptions,
        });
    }
    const viewerLoadableOutput = [
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
    const viewerLoadablePath = 'dist/src/viewer-loadable.js';
    if ((0, fs_1.existsSync)(`./${viewerLoadablePath}`)) {
        viewerEntry.push({
            input: viewerLoadablePath,
            output: viewerLoadableOutput,
            ...commonOptions,
        });
    }
    let entries;
    if (process.env.MODULE_ANALYZE_EDITOR) {
        entries = [editorEntry, ...libEntries];
    }
    else if (process.env.MODULE_ANALYZE_VIEWER) {
        entries = [...viewerEntry, ...libEntries];
    }
    else {
        entries = [editorEntry, ...viewerEntry, ...libEntries];
    }
    const mobileNativeLoaderPath = 'dist/src/mobileNativeLoader.js';
    if ((0, fs_1.existsSync)(`./${mobileNativeLoaderPath}`)) {
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
    lastEntry.plugins = [...lastEntry.plugins, ...rollup_plugins_1.lastEntryPlugins];
    return entries.filter(x => x);
};
const output = process.env.DYNAMIC_IMPORT
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
exports.default = commonConfig(output, process.env.EXTRACT_CSS !== 'false');
