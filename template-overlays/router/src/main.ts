import { Core } from "@koppajs/koppajs-core";
import {
  KOPPAJS_ROUTE_CHANGE_EVENT,
  KoppajsRouter,
  type RouteDefinition,
} from "@koppajs/koppajs-router";

import appView from "./app-view.kpa";
import counterComponent from "./counter-component.kpa";
import homePage from "./home-page.kpa";
import notFoundPage from "./not-found-page.kpa";
import routerPage from "./router-page.kpa";

const ROUTE_LINK_SELECTOR = "a[data-route]";

const routes = [
  {
    path: "/",
    componentTag: "home-page",
  },
  {
    path: "/router",
    componentTag: "router-page",
  },
  {
    path: "*",
    componentTag: "not-found-page",
  },
] satisfies readonly RouteDefinition[];

let routerStarted = false;

Core.take(appView, "app-view");
Core.take(counterComponent, "counter-component");
Core.take(homePage, "home-page");
Core.take(routerPage, "router-page");
Core.take(notFoundPage, "not-found-page");
Core();

bootRouter();

function bootRouter() {
  if (routerStarted) {
    return;
  }

  const outlet = document.querySelector<HTMLElement>("#app-outlet");

  if (!outlet) {
    window.requestAnimationFrame(bootRouter);
    return;
  }

  routerStarted = true;

  const router = new KoppajsRouter({
    routes,
    outlet,
    root: document,
  });

  const syncRouteLinks = () => {
    document
      .querySelectorAll<HTMLAnchorElement>(ROUTE_LINK_SELECTOR)
      .forEach((link) => {
        const routeTarget = link.getAttribute("data-route");

        if (!routeTarget) {
          return;
        }

        link.setAttribute("href", router.hrefFor(routeTarget));
      });
  };

  window.addEventListener(KOPPAJS_ROUTE_CHANGE_EVENT, syncRouteLinks);

  router.init();
  syncRouteLinks();
}
