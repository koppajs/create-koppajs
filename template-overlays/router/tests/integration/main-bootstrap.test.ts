import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type FakeLink = {
  getAttribute: (name: string) => string | null;
  setAttribute: (name: string, value: string) => void;
};

type RouterCtorOptions = {
  outlet: HTMLElement;
  root: Document;
  routes: Array<{
    path: string;
    componentTag: string;
  }>;
};

const outlet = {} as HTMLElement;

function createFakeLink(initialRoute: string, initialHref: string): FakeLink {
  const attributes = new Map([
    ["data-route", initialRoute],
    ["href", initialHref],
  ]);

  return {
    getAttribute(name: string) {
      return attributes.get(name) ?? null;
    },
    setAttribute(name: string, value: string) {
      attributes.set(name, value);
    },
  };
}

const { core, take, routerCtor, routerHrefFor, routerInit } = vi.hoisted(() => {
  const take = vi.fn();
  const core = Object.assign(vi.fn(), { take });
  const routerInit = vi.fn();
  const routerHrefFor = vi.fn((target: string) => target);
  const routerCtor = vi.fn(function RouterCtor(options: RouterCtorOptions) {
    void options;

    return {
      hrefFor: routerHrefFor,
      init: routerInit,
    };
  });

  return {
    core,
    take,
    routerCtor,
    routerHrefFor,
    routerInit,
  };
});

vi.mock("@koppajs/koppajs-core", () => ({
  Core: core,
}));

vi.mock("@koppajs/koppajs-router", () => ({
  KOPPAJS_ROUTE_CHANGE_EVENT: "koppajs-route-change",
  KoppajsRouter: routerCtor,
}));

describe("main bootstrap", () => {
  const querySelector = vi.fn((selector: string) =>
    selector === "#app-outlet" ? outlet : null,
  );
  const querySelectorAll = vi.fn(() => [] as FakeLink[]);
  const addEventListener = vi.fn();
  const requestAnimationFrame = vi.fn();
  let links: FakeLink[] = [];

  beforeEach(() => {
    links = [createFakeLink("/", "/"), createFakeLink("/router", "/router")];

    querySelector.mockImplementation((selector: string) =>
      selector === "#app-outlet" ? outlet : null,
    );
    querySelectorAll.mockImplementation(() => links);
    addEventListener.mockReset();
    requestAnimationFrame.mockReset();

    vi.stubGlobal("document", {
      querySelector,
      querySelectorAll,
    } as unknown as Document);
    vi.stubGlobal("window", {
      addEventListener,
      requestAnimationFrame,
    } as unknown as Window);
  });

  afterEach(() => {
    core.mockClear();
    take.mockClear();
    routerCtor.mockClear();
    routerHrefFor.mockClear();
    routerInit.mockClear();
    vi.resetModules();
    vi.unstubAllGlobals();
  });

  it("registers app components, boots core, and starts the router once", async () => {
    await import("../../src/main");

    expect(take).toHaveBeenCalledTimes(5);
    expect(take).toHaveBeenNthCalledWith(1, expect.anything(), "app-view");
    expect(take).toHaveBeenNthCalledWith(
      2,
      expect.anything(),
      "counter-component",
    );
    expect(take).toHaveBeenNthCalledWith(3, expect.anything(), "home-page");
    expect(take).toHaveBeenNthCalledWith(4, expect.anything(), "router-page");
    expect(take).toHaveBeenNthCalledWith(
      5,
      expect.anything(),
      "not-found-page",
    );
    expect(core).toHaveBeenCalledTimes(1);

    expect(routerCtor).toHaveBeenCalledTimes(1);
    const [routerOptions] = routerCtor.mock.calls[0] ?? [];

    expect(routerOptions).toBeDefined();
    expect(routerOptions?.outlet).toBe(outlet);
    expect(routerOptions?.root).toBe(globalThis.document);
    expect(
      routerOptions?.routes.map((route) => ({
        path: route.path,
        componentTag: route.componentTag,
      })),
    ).toEqual(
      expect.arrayContaining([
        { path: "/", componentTag: "home-page" },
        { path: "/router", componentTag: "router-page" },
        { path: "*", componentTag: "not-found-page" },
      ]),
    );
    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(routerInit).toHaveBeenCalledTimes(1);
    expect(routerHrefFor).toHaveBeenNthCalledWith(1, "/");
    expect(routerHrefFor).toHaveBeenNthCalledWith(2, "/router");
    expect(links[0]?.getAttribute("href")).toBe("/");
    expect(links[1]?.getAttribute("href")).toBe("/router");
  });
});
