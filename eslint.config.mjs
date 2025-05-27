import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import babelParser from "@babel/eslint-parser";

export default [
  // Backend (Node.js)
  {
    files: ["packages/backend/**/*.js"],
    languageOptions: { globals: globals.node },
    plugins: { prettier: pluginPrettier },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },

  // Frontend (React)
  {
    files: ["packages/frontend/**/*.jsx"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      globals: globals.browser,
    },
    plugins: { react: pluginReact, prettier: pluginPrettier },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
];
