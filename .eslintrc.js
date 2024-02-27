module.exports = {
  root: true,
  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",

  plugins: [
    "react",
    "jsx-a11y",
    "@typescript-eslint",
    "testing-library",
    "jest-dom",
    "@tanstack/query",
    "prettier",
  ],

  rules: {
    "react/react-in-jsx-scope": "off",

    // imports
    "import/no-unresolved": "error",
    "no-restricted-imports": [
      "warn",
      {
        patterns: ["@/features/*/*"],
      },
    ],

    "import/order": [
      "error",
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

    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
      { usePrettierrc: true },
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
    "jsx-a11y/label-has-associated-control": [1],
  },

  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
