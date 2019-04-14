module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json'
  },
  extends: [
    'standard',
    'plugin:vue/recommended',
    '@vue/prettier',
    '@vue/typescript'
  ],
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    'no-multi-spaces': 'off',
    'no-undef': 'warn',
    'no-console': 'warn',
    indent: 'warn',
    'prettier/prettier': [
      'error',
      {
        useTabs: false,
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        semi: false,
        arrowParens: 'always'
      }
    ]
  }
}
