module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    '@vue/prettier',
    '@vue/typescript',
    'prettier/@typescript-eslint'
  ],
  plugins: ['@typescript-eslint', 'prettier', 'vue'],
  rules: {
    'no-multi-spaces': 'off',
    'no-undef': 'warn',
    'no-console': 'warn',
    '@typescript-eslint/indent': ['warn', 2],
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
