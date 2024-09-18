import Hash from "./hash";
import { Root } from "./lib";
import Navigation from "./navigation";
import Pages from "./page";
import Repository from "./repository";
import RepositoryMem from "./repositoryMemory";
import Route from "./route";

export default class Plugins extends Hash(Navigation(Repository(RepositoryMem(Route(Pages(Root)))))) {}