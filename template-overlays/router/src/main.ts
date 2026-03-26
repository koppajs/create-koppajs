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
    name: "home",
    title: "Home",
    description: "Landing page for the KoppaJS router starter.",
    componentTag: "home-page",
  },
  {
    path: "/router",
    name: "router",
    title: "Router",
    description: "Second page showing how the KoppaJS router starter works.",
    componentTag: "router-page",
  },
  {
    path: "*",
    name: "not-found",
    title: "Not found",
    description: "Fallback page for unmatched routes in the router starter.",
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
