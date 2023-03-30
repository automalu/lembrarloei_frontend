import { Root } from "./lib";
import Pages from "./page";
import Repository from "./repository";
import Route from "./route";

export default class Plugins extends Repository(Route(Pages(Root))) {}