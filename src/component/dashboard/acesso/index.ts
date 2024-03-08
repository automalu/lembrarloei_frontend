import Z, { Zeyo, ZeyoAs } from "zeyo"
import App from "../../../app"
import Card from "../../card"

export default class Acesso {
    app: App
    counter: ZeyoAs<"p">
    element: Zeyo
    constructor(app: App) {
        this.app = app
        this.element = Card(
            Z("h3").text("Acessos"),
            this.counter = Z("p")
        ).class("acesso")
        this.setData([])
    }
    setData(result: any[]) {
        this.counter.text(result.length.toString())
    };
}