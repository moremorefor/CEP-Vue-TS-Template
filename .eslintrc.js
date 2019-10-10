module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jquery: true
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
  },
  overrides: [
    {
      files: ['src/jsx/**/*.ts'],
      parser: 'vue-eslint-parser',
      rules: {
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/camelcase': 'off'
      }
    }
  ]
}
