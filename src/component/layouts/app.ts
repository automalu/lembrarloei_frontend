import Z, { Zeyo } from "zeyo";
import App from "../../app";
import style from "./layout.module.css";
import Menu from "./menu/menu";

export default class LayoutApp {
    slot: Zeyo = Z("main")
    main: Zeyo;
    menu: Menu
    hidded: boolean = false
    constructor(app: App, menu: Menu) {
        this.menu = menu
        this.main = Z("main").class(style.layout).children(
            this.menu.create().class(style.menu),
            this.slot
        )
    }
    hide() {
        this.slot.element.classList.toggle(style.hide)
        this.hidded = this.slot.element.classList.contains(style.hide)
    }

    inner(z: Zeyo) {
        this.slot.element.parentElement?.replaceChild(z.element, this.slot.element);
        this.slot = z.class(style.main)
        return this.main
    }
}