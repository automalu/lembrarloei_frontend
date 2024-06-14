import Z, { ZeyoAs } from "zeyo";
import App from "../../../../app";
import SpanContentEditable from "../../../../features/contenteditable/component";
import style from "./style.module.css"
import Icon from "../../../../component1.1/icons";

export default class Chat extends ZeyoAs<"div"> {
    input: ZeyoAs<"span">
    chatbody: ZeyoAs<"div">
    constructor(app: App) {
        super("div")
        this.class("d-grid", "gap-m").children(
            Z("h2").text("Conversas"),
            Z("label").text("Pesquisar conversas"),
            Z("div").class("body").children(
                this.chatbody = Z("div").class("chat"),
                Z("div").class(style.footer, "d-flex", "gap-m").children(
                    Z("div").class("attachment", "d-flex").children(
                        Z("button").class(style["icon"]).children(new Icon("emoji")),
                        Z("button").class(style["icon"]).children(new Icon("paperclip"))
                    ),
                    Z("div").class("w-100", style["msg-creator"]).children(
                        this.input = new SpanContentEditable(app, () => this.sendMessage()).class("w-100").text("Inserir Mensagem"),
                    ),
                    Z("div").class("attachment", "d-flex").children(
                        Z("button").class(style["icon"]).children(new Icon("mic")),
                        Z("button").class(style["icon"]).children(new Icon("plane")).click(() => {
                            this.sendMessage()
                        })
                    ),
                )
            )
        )
    }

    sendMessage() {
        this.chatbody.children(Z("div").HTML(this.input.element.innerHTML))
        this.input.element.innerHTML = ""
    }
}