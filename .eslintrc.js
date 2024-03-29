module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:editorconfig/all",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:playwright/playwright-test",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    "editorconfig",
    "eslint-plugin-import",
    "eslint-plugin-jsdoc",
    "eslint-plugin-prefer-arrow",
    "@typescript-eslint",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array",
      },
    ],
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "Object": {
            message: "Avoid using the `Object` type. Did you mean `object`?",
          },
          "Function": {
            message: "Avoid using the `Function` type. Prefer a specific function type, like `() => void`.",
          },
          "Boolean": {
            message: "Avoid using the `Boolean` type. Did you mean `boolean`?",
          },
          "Number": {
            message: "Avoid using the `Number` type. Did you mean `number`?",
          },
          "String": {
            message: "Avoid using the `String` type. Did you mean `string`?",
          },
          "Symbol": {
            message: "Avoid using the `Symbol` type. Did you mean `symbol`?",
          },
        },
      },
    ],
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/eol-last": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": [
      "off",
      {
        accessibility: "explicit",
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/linebreak-style": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
      },
    ],
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-array-constructor": "error",
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "@typescript-eslint/no-extra-semi": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-implied-eval": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-loss-of-precision": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-shadow": [
      "error",
      {
        hoist: "all",
      },
    ],
    "@typescript-eslint/no-this-alias": "error",
    "@typescript-eslint/no-trailing-spaces": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/quotes": ["off"],
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/restrict-template-expressions": "error",
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/triple-slash-reference": [
      "error",
      {
        path: "always",
        types: "prefer-import",
        lib: "always",
      },
    ],
    "@typescript-eslint/typedef": "off",
    "@typescript-eslint/unbound-method": "error",
    "@typescript-eslint/unicode-bom": "off",
    "@typescript-eslint/unified-signatures": "error",
    "arrow-parens": ["off", "always"],
    "constructor-super": "error",
    "dot-notation": "error",
    "eqeqeq": ["error", "smart"],
    "for-direction": "error",
    "getter-return": "error",
    "guard-for-in": "error",
    "id-denylist": [
      "error",
      "any",
      "Number",
      "number",
      "String",
      "string",
      "Boolean",
      "boolean",
      "Undefined",
      "undefined",
    ],
    "id-match": "error",
    "import/order": "off",
    "jsdoc/check-alignment": "error",
    "jsdoc/check-indentation": "error",
    "jsdoc/newline-after-description": "error",
    "max-classes-per-file": ["error", 1],
    "max-len": [
      "error",
      {
        code: 120,
      },
    ],
    "new-parens": "error",
    "no-array-constructor": "off",
    "no-async-promise-executor": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-case-declarations": "error",
    "no-class-assign": "error",
    "no-compare-neg-zero": "error",
    "no-cond-assign": "error",
    "no-console": "off",
    "no-const-assign": "error",
    "no-constant-condition": "error",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-delete-var": "error",
    "no-dupe-args": "error",
    "no-dupe-class-members": "error",
    "no-dupe-else-if": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-empty-character-class": "error",
    "no-empty-function": "error",
    "no-empty-pattern": "error",
    "no-eval": "error",
    "no-ex-assign": "error",
    "no-extra-boolean-cast": "error",
    "no-fallthrough": "off",
    "no-func-assign": "error",
    "no-global-assign": "error",
    "no-implied-eval": "off",
    "no-import-assign": "error",
    "no-inner-declarations": "error",
    "no-invalid-regexp": "error",
    "no-invalid-this": "off",
    "no-irregular-whitespace": "error",
    "no-loss-of-precision": "error",
    "no-misleading-character-class": "error",
    "no-new-symbol": "error",
    "no-new-wrappers": "error",
    "no-nonoctal-decimal-escape": "error",
    "no-obj-calls": "error",
    "no-octal": "error",
    "no-prototype-builtins": "error",
    "no-redeclare": "error",
    "no-regex-spaces": "error",
    "no-self-assign": "error",
    "no-setter-return": "error",
    "no-shadow": "error",
    "no-shadow-restricted-names": "error",
    "no-sparse-arrays": "error",
    "no-this-before-super": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "no-undef": "error",
    "no-undef-init": "error",
    "no-underscore-dangle": "error",
    "no-unreachable": "error",
    "no-unsafe-finally": "error",
    "no-unsafe-negation": "error",
    "no-unsafe-optional-chaining": "error",
    "no-unused-expressions": "error",
    "no-unused-labels": "error",
    "no-unused-vars": "error",
    "no-use-before-define": "off",
    "no-useless-backreference": "error",
    "no-useless-catch": "error",
    "no-useless-escape": "error",
    "no-var": "error",
    "no-with": "error",
    "object-shorthand": "error",
    "one-var": ["error", "never"],
    "prefer-arrow/prefer-arrow-functions": "error",
    "prefer-const": "error",
    "prettier/prettier": "error",
    "quotes": "off",
    "radix": "error",
    "require-await": "off",
    "require-yield": "error",
    "semi": "error",
    "spaced-comment": [
      "error",
      "always",
      {
        markers: ["/"],
      },
    ],
    "use-isnan": "error",
    "valid-typeof": "off",
  },
};
