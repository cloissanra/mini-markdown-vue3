import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 忽略 .d.ts 文件
  {
    ignores: ["**/*.d.ts"],
  },

  // 基础规则
  pluginJs.configs.recommended,

  // TypeScript 规则
  ...tseslint.configs.recommended,

  // Vue 规则
  ...pluginVue.configs["flat/essential"],

  // 全局变量
  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  // Vue 文件的解析器配置
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
];
