/// <reference types="vitest" />

import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import path from "path";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      exclude: [
        ...configDefaults.exclude,
        "stories/**",
        "**/.eslintrc.cjs/**",
        "**/.storybook/**",
      ],
    },
  },
  plugins: [vue(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Siren",
      fileName: "siren-vue-inbox",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        format: "esm",
      },
    },
  },
});
