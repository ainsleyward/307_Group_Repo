import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, prettier: pluginPrettier },
    extends: [
      "js/recommended",
      "plugin:prettier/recommended", // Integrates Prettier
    ],
    languageOptions: { globals: globals.browser },
    rules: {
      "prettier/prettier": ["error", {}], // Ensures Prettier formatting is enforced
    },
  },
  pluginReact.configs.flat.recommended,
]);
