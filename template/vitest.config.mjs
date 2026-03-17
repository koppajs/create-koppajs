import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.mjs";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["tests/**/*.test.ts"],
      coverage: {
        provider: "v8",
        reporter: ["text", "html"],
        reportsDirectory: "./coverage",
        include: ["src/**/*.ts"],
        exclude: ["playwright.config.ts", "tests/**/*.ts", "vitest.config.mjs"],
      },
    },
  }),
);
