import { ZeyoAs } from "zeyo"
import App from "../app";
import style from "../component/lista.module.css";

export default class Card extends ZeyoAs<"div"> {
    app: App
    constructor(app: App) {
        super("div")
        this.app = app
        this.class("pointer", style.card)
    }
}