import type { Plugin } from "vite";
import { describe, expect, it } from "vitest";

import { normalizeKpaModuleExport } from "../../vite.config.mjs";

async function transformWith(plugin: Plugin, code: string, id: string) {
  const transform = plugin.transform;

  if (!transform) {
    return null;
  }

  if (typeof transform === "function") {
    return transform.call({} as never, code, id);
  }

  return transform.handler.call({} as never, code, id);
}

describe("normalizeKpaModuleExport", () => {
  it("wraps raw KPA output in an ES module export", async () => {
    const plugin = normalizeKpaModuleExport();

    await expect(
      transformWith(plugin, '{ template: "<div></div>" }', "/src/app-view.kpa"),
    ).resolves.toEqual({
      code: 'export default { template: "<div></div>" };',
      map: null,
    });
  });

  it("ignores non-KPA files and already exported modules", async () => {
    const plugin = normalizeKpaModuleExport();

    await expect(
      transformWith(plugin, "const count = 0;", "/src/main.ts"),
    ).resolves.toBeNull();
    await expect(
      transformWith(
        plugin,
        "export default { template: '<div></div>' };",
        "/src/app-view.kpa",
      ),
    ).resolves.toBeNull();
  });
});
