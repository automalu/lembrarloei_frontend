import Z, { Zeyo } from "zeyo";
import Component from "../..";
import { Watcher } from "../../watcher";
import NavigationIcons from "./icons";
import Navigation from "./navigation";
import User from "../../../navigation/state/user";
import App from "../../../app";
import Nav from "../../../navigation";

export default class Menu extends Component{
    main: Zeyo = Z("div");
    state: User = new Proxy(new User(), new Watcher(null, "", []))
    navigation: Nav
    constructor(app: App, navigation: Nav) {
        super(app)
        this.navigation = navigation
    }
    create(): Zeyo {
        return this.main = Z("div").children(
            new Navigation(this.app).watchSet(this.navigation.state).create(this.navigation.state),
            //new NavigationIcons(this.app).watchSet(this.navigation.state).create(this.navigation.state)
        )
    }
}