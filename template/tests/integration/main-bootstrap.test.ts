import { afterEach, describe, expect, it, vi } from "vitest";

const { core, take } = vi.hoisted(() => {
  const take = vi.fn();
  const core = Object.assign(vi.fn(), { take });

  return { core, take };
});

vi.mock("@koppajs/koppajs-core", () => ({
  Core: core,
}));

describe("main bootstrap", () => {
  afterEach(() => {
    core.mockClear();
    take.mockClear();
    vi.resetModules();
  });

  it("registers the root components and boots the app once", async () => {
    await import("../../src/main");

    expect(take).toHaveBeenCalledTimes(2);
    expect(take).toHaveBeenNthCalledWith(1, expect.anything(), "app-view");
    expect(take).toHaveBeenNthCalledWith(
      2,
      expect.anything(),
      "counter-component",
    );
    expect(core).toHaveBeenCalledTimes(1);
  });
});
