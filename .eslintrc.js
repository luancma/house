/* eslint-disable no-undef */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "unused-imports"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-console": process.env.NODE_ENV !== "dev" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV !== "dev" ? "warn" : "off",
    "unused-imports/no-unused-imports": "error",
  },
};
