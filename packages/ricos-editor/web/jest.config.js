module.exports = {
  globals: {
    NODE_ENV: 'test',
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.jsx?$': '<rootDir>/../../../babel.jest.monorepo.js',
    '\\.st\\.css?$': require.resolve('@stylable/jest'),
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '.*(?<!(st)\\.|^.)(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(.*?\\.st\\.css$))', // libraries publish .st.css files in their dist
  ],
};
