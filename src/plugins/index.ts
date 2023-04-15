import { Root } from "./lib";
import Navigation from "./navigation";
import Pages from "./page";
import Repository from "./repository";
import Route from "./route";

export default class Plugins extends Navigation(Repository(Route(Pages(Root)))) {}