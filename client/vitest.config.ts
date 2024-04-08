/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "happy-dom",
    env: {
      TZ: 'UTC'
    },
    setupFiles: "./vitest.setup.ts",
    coverage: {
      thresholds: {
        functions: 90,
        branches: 100,
        statements: 100,
        lines: 100,
      },
    },
  },
  esbuild: {
    target: "esnext",
  },
});
