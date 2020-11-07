module.exports = {
  plugins: [
    'stylelint-scss',
    'stylelint-declaration-block-no-ignored-properties',
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-rational-order',
  ],
  ignoreFiles: ['**/node_modules/**', 'src/css/*.min.css'],
  rules: {
    // plugins
    'plugin/declaration-block-no-ignored-properties': true,

    // other
    'font-family-no-missing-generic-family-keyword': true,
    'selector-pseudo-element-colon-notation': 'double',
    'no-empty-source': null,
    'no-descending-specificity': [true, { severity: 'warning' }],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
}
