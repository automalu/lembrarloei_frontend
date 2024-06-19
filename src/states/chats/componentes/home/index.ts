import Z, { ZeyoAs } from "zeyo";
import App from "../../../../app";
import Card from "../../../../component1.1/card";
import { ChangeSlide } from "../../../../component1.1/layout/columnsToTab";
import style from "./style.module.css"

export default class Home extends ZeyoAs<"div">{
    name = "home"
    
    constructor(app: App, changeSlide: ChangeSlide) {
        super("div")
        this.class("d-grid", "gap-m", style.container).children(
            Z("h2").text("Conversas"),
            Z("label").text("Pesquisar conversas"),
            Z("div").class("listavertical").object(o => {
                app.repositoryMemory.createTriggerTo("Chats", (value) => {
                    o.children(
                        new Card(app).children(
                            Z("div").class("header", "g-flex", "jc-between").children(
                                Z("h3").text(value.title),
                                Z("label").text("15:22")
                            ),
                            Z("div").class("body", "g-flex", "jc-between").children(
                                Z("label").text("mensagem"),
                            )
                        ).click(() => {
                            changeSlide({name: "chat"}, value)
                        })
                    )
                }, "create")
            })
        )
    }
}