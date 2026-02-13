import { defineConfig } from "vite";
import koppaPlugin from "@koppajs/koppajs-vite-plugin";

export default defineConfig({
  plugins: [
    koppaPlugin({
      tsconfigFile: "./tsconfig.json"
    })
  ]
});
