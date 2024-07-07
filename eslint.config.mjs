import globals from "globals";
import tseslint from "typescript-eslint";
import paratcoEslintConfig from "@paratco/eslint-config";

export default tseslint.config(
  ...paratcoEslintConfig.node,

  { languageOptions: { globals: globals.node } },

  {
    languageOptions: {
      globals: {
        ...globals.node
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },

  {
    ignores: ["dist", "eslint.config.mjs", "rollup.config.js"]
  }
);
