import Z, { Zeyo } from "zeyo";
import Component from "../..";
import Navigation from "./navigation";
import App from "../../../app";
import Nav from "../../../navigation";

export default class Menu extends Component{
    main: Zeyo = Z("div");
    navigation: Nav
    constructor(app: App, navigation: Nav) {
        super(app)
        this.navigation = navigation
    }
    create(): Zeyo {
        return this.main = Z("div").children(
            new Navigation(this.app).watchSet(this.navigation).create(this.navigation),
            //new NavigationIcons(this.app).watchSet(this.navigation.state).create(this.navigation.state)
        )
    }
}