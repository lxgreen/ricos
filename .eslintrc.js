module.exports = {
  extends: ['./eslintConfig.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['lodash', 'fp', 'jsx-a11y', 'prettier', '@typescript-eslint'],
      extends: [
        'wix/react',
        'plugin:jsx-a11y/strict',
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        './eslintConfig.js',
        './eslintTSConfig.js',
      ],
    },
  ],
};
