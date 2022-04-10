module.exports = {
  pipeline: {
    build: ['^build'],
    'build:dev': ['^build:dev'],
    test: ['build:test'],
    ci: [],
  },
  // Ignores these minimatch patterns when considers what packages have changed for the --since flag
  // ignore: ['CAHNGELOG.md'],
  cacheOptions: {
    writeRemoteCache: true,
    // These are the subset of files in the package directories that will be saved into the cache
    outputGlob: ['dist/**', 'lib/**', 'generated/**'],
    // These are relative to the git root, and affects the hash of the cache
    // Any of these file changes will invalidate cache
    environmentGlob: ['./rollup.plugins.ts', './rollup.externals.ts', './rollup.config.common.ts'],
    internalCacheFolder: '../../../.cache/backfill',
  },
  npmClient: 'yarn',
};
