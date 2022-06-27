module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  ignorePatterns: [
    'node_modules',
    'build',
    'coverage',
    '.eslintrc.js'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  root: true,
  rules: {
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'warn',
  },
}
