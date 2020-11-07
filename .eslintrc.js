module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jquery: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: ['./tsconfig.json', './src/jsx/**/tsconfig.json'],
    extraFileExtensions: ['.vue'],
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  rules: {
    'no-console': 'warn',
    'space-before-function-paren': 'off',
    'arrow-parens': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
        },
      },
    ],
  },
  overrides: [
    {
      files: ['src/jsx/**/*.ts'],
      parser: 'vue-eslint-parser',
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'unicorn/prefer-starts-ends-with': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/camelcase': 'off',
      },
    },
  ],
}
