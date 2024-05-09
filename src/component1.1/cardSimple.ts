import Z, { Zeyo, ZeyoAs } from "zeyo"
import App from "../app";
import style from "../component/lista.module.css";

export default class CardSimple extends ZeyoAs<"div"> {
    app: App
    zTitle: Zeyo
    zDescription: Zeyo
    constructor(app: App, title: string, description: string) {
        super("div")
        this.app = app
        this.class("pointer", style.card).children(
            this.zTitle = Z("h3").text(title),
            this.zDescription = Z("p").text(description)
        )
    }

    update(title: string, description: string) {
        this.zTitle.text(title)
        this.zDescription.text(description)
    }
}