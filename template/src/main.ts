import { Core } from "@koppajs/koppajs-core";

import appView from "./app-view.kpa";
import counterComponent from "./counter-component.kpa";

Core.take(appView, "app-view");
Core.take(counterComponent, "counter-component");
Core();
