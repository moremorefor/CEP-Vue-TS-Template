module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jquery: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    project: ["./tsconfig.json", "./src/jsx/**/tsconfig.json"],
  },
  extends: [
    // base
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',

    // plugins
    'plugin:@typescript-eslint/recommended',
    "plugin:vue/recommended",
    "plugin:prettier/recommended",

    // prettier
    "prettier/@typescript-eslint",
    "prettier/vue"
  ],
  rules: {
    "no-console": "warn",
    "space-before-function-paren": "off",
    "arrow-parens": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
        },
      },
    ],
    "prettier/prettier": [
      "error",
      {
        useTabs: false,
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        semi: false,
        arrowParens: "always",
        trailingComma: "es5",
      },
    ],
  },
  overrides: [
    {
      files: ["src/jsx/**/*.ts"],
      parser: "vue-eslint-parser",
      rules: {
        "no-undef": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/camelcase": "off",
      },
    },
  ],
};
