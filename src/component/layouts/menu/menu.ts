import Z, { Zeyo } from "zeyo";
import Component from "../..";
import { Watcher } from "../../watcher";
import NavigationIcons from "./icons";
import Navigation from "./navigation";
import User from "./state/user";

export default class Menu extends Component{
    main: Zeyo = Z("div");
    state: User = new Proxy(new User(), new Watcher(null, "", []))
    create(): Zeyo {
        return this.main = Z("div").children(
            new Navigation(this.app).watchSet(this.state).create(this.state),
            new NavigationIcons(this.app).watchSet(this.state).create(this.state)
        )
    }
}