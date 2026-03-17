import koppaPlugin from "@koppajs/koppajs-vite-plugin";
import { defineConfig } from "vite";

/**
 * Wrap raw `.kpa` object output in a valid ES module export.
 *
 * @returns {import("vite").Plugin}
 */
export function normalizeKpaModuleExport() {
  return {
    name: "normalize-kpa-module-export",
    enforce: "post",
    /**
     * @param {string} code
     * @param {string} id
     */
    transform(code, id) {
      const cleanId = id.split("?")[0];

      if (!cleanId.endsWith(".kpa")) {
        return null;
      }

      const trimmed = code.trim();

      if (!trimmed.startsWith("{") || trimmed.startsWith("export default")) {
        return null;
      }

      return {
        code: `export default ${trimmed};`,
        map: null,
      };
    },
  };
}

export default defineConfig({
  plugins: [
    koppaPlugin({
      tsconfigFile: "./tsconfig.json",
    }),
    normalizeKpaModuleExport(),
  ],
});
