module.exports = {
  pipeline: {
    build: ['^build'],
    'build:dev': ['^build:dev'],
    test: ['build:test'],
    ci: [],
  },
  cacheOptions: {
    writeRemoteCache: true,
    cacheStorageConfig: {
      provider: 'npm',
      options: {
        npmPackageName: 'ricos-build-cache',
        npmrcUserconfig: process.env.PWD + '/.lageNpmConfig',
      },
    },
    // These are the subset of files in the package directories that will be saved into the cache
    outputGlob: ['dist/**', 'lib/**', 'generated/**'],
    // These are relative to the git root, and affects the hash of the cache
    // Any of these file changes will invalidate cache
    environmentGlob: ['../../../yarn.lock'],
  },
  npmClient: 'yarn',
};
