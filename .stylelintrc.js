module.exports = {
    "plugins": [
        "stylelint-scss",
        "stylelint-prettier",
        "stylelint-declaration-block-no-ignored-properties",
    ],
    "extends": [
        "stylelint-config-standard",
        "stylelint-prettier/recommended",
        "stylelint-config-rational-order"
    ],
    "ignoreFiles": [
        "**/node_modules/**"
    ],
    "rules": {
        // plugins
        "prettier/prettier": true,
        "plugin/declaration-block-no-ignored-properties": true,


        // other
        "font-family-no-missing-generic-family-keyword": true,
        "declaration-block-trailing-semicolon": "always",
        "selector-pseudo-element-colon-notation": "double"
    }
};