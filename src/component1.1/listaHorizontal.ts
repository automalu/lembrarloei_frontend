import Z, { Zeyo, ZeyoAs } from "zeyo";
import App from "../app";
import style from "../component/lista.module.css";
export default class ListaHorizontal extends ZeyoAs<"div"> {
    main: Zeyo = Z("div");
    app: App
    constructor(app: App, title: string) {
        super("div")
        this.app = app
        this.class("d-grid", "gap-m", style.lista).children(
            Z("h2").text(title),
            Z("div").class("d-grid", "gap-m", "o-auto")
        )
    }
    push(z: Zeyo) {
        this.childList[1].children(z)
    }
}