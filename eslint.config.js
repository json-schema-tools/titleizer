const tsPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    ignores: ["build/", "coverage/", "docs/", "eslint.config.js", "jest.config.js"],
  },
  ...tsPlugin.configs["flat/recommended"],
  {
    files: ["**/*.test.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
