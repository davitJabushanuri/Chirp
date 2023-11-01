module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
  },
  ignorePatterns: ["node_modules/*", ".next/*"],

  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "plugin:cypress/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],

  plugins: [
    "@typescript-eslint",
    "react",
    "jsx-a11y",
    "testing-library",
    "jest-dom",
    "cypress",
    "@tanstack/query",
  ],

  globals: {
    React: "readonly",
  },

  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],

  rules: {
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",

    "no-restricted-imports": [
      "warn",
      {
        patterns: ["@/features/*/*"],
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],

    // React testing library
    "testing-library/await-async-queries": "error",
    "testing-library/no-await-sync-queries": "error",
    "testing-library/no-debugging-utils": "warn",
    "testing-library/no-dom-import": "off",
    "testing-library/no-await-sync-events": [
      "error",
      {
        eventModules: ["fire-event"],
      },
    ],
    "@tanstack/query/exhaustive-deps": "warn",
    "@tanstack/query/stable-query-client": "warn",
  },
};
