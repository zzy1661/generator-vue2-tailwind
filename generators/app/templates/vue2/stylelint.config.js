const tailwindAt = ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer'];
module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss'],
  ignoreFiles: ['node_modules/**', 'dist/**'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: tailwindAt,
      },
    ],
    'selector-max-id': null,
    'selector-class-pattern': null,
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'no-irregular-whitespace': null,
    'no-invalid-position-at-import-rule': null,
    'declaration-block-no-duplicate-custom-properties': null,
    'no-duplicate-selectors': null,
    // ::v-deep
    'selector-pseudo-element-no-unknown': null
  },
};
