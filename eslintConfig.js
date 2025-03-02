module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['lodash', 'fp', 'jsx-a11y', 'prettier', 'cypress'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['wix/react', 'plugin:jsx-a11y/strict', 'plugin:cypress/recommended'],
  settings: {
    react: {
      version: '16.6.3',
    },
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          'draft-js': '../../../node_modules/@wix/draft-js',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        packages: ['packages/*'],
      },
    },
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    semi: 'error',
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    'new-cap': 'off',
    'lines-between-class-members': ['error', 'always'],
    'quote-props': 'off',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],
    'react/jsx-space-before-closing': 'off',
    'react/jsx-tag-spacing': 'warn',
    'react/style-prop-object': 'off',
    'react/jsx-handler-names': 'off',
    camelcase: 'off',
    'max-params': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-use-before-define': 'off',
    'no-mixed-operators': 'off',
    'no-mixed-spaces-and-tabs': 'error',
    'no-tabs': 'error',
    'space-before-function-paren': 'off',
    'object-curly-spacing': ['error', 'always'],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
      },
    ],
    'react/jsx-no-bind': 0,
    'fp/no-loops': 'warn',
    'fp/no-delete': 'error',
    'fp/no-get-set': 'error',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-skipped-tests': 'error',
    'mocha/no-pending-tests': 'error',
    'no-misleading-character-class': 'off',
    'no-param-reassign': 'warn',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/aria-proptypes': 'off',
    'prettier/prettier': 'error',
    'lodash/import-scope': [2, 'member'],
    'operator-linebreak': 'off',
    'no-unused-vars': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['lodash/fp'],
            message: 'lodash/fp is not supported by yoshi -- please use fp-ts instead',
          },
          {
            group: ['fp-ts/lib/*'],
            message: 'fp-ts/lib/* is not tree-shakable, please import from fp-ts/*',
          },
        ],
      },
    ],
    indent: 'off',
    curly: 'off',
    'cypress/no-unnecessary-waiting': 'warn',
    'no-duplicate-imports': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
