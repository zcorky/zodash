module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 0, // warn
    '@typescript-eslint/explicit-module-boundary-types': 0, // warn
    '@typescript-eslint/ban-types': 0, // error
    'prefer-spread': 0, // error
    '@typescript-eslint/no-non-null-assertion': 0, // warn
    'no-prototype-builtins': 0,
    'no-async-promise-executor': 0,
  },
};
