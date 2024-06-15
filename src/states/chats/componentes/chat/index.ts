import Z, { ZeyoAs } from "zeyo";
import App from "../../../../app";
import SpanContentEditable from "../../../../features/contenteditable/component";
import style from "./style.module.css"
import Icon from "../../../../component1.1/icons";
import Message from "./message";

export default class Chat extends ZeyoAs<"div"> {
    input: SpanContentEditable
    constructor(app: App) {
        super("div")
        this.class("d-grid", "gap-m", style.container).children(
            Z("header").class("d-flex", "gap-g", "a-center").children(
                new Icon("arrow-left").class("icon-size"),
                Z("h2").text("Conversa"),
            ),
            Z("div").class("d-grid", style.body).children(
                Z("div").class("d-grid", style.chat).object(o => 
                    app.repositoryMemory.createTriggerTo("Chatmensagens", (value) =>{
                        o.children(new Message(app, value))
                    }, "create")),
            ),
            Z("div").class(style.footer, "d-flex", "gap-m").children(
                Z("div").class("attachment", "d-flex").children(
                    Z("button").class(style["icon"]).children(new Icon("emoji")),
                    Z("button").class(style["icon"]).children(new Icon("paperclip"))
                ),
                Z("div").class("w-100", style["msg-creator"]).children(
                    this.input = new SpanContentEditable(app, () => this.sendMessage()).class("w-100"),
                    Z("span").class(style.placeholder).text("Inserir Mensagem")
                ).click(() => this.input.element.focus()).object(o => {
                    this.input.isTyping((typing) => {
                        console.log(typing, o.childList[1])
                        if(typing) o.childList[1].element.classList.add(style.hidde)
                        else o.childList[1].element.classList.remove(style.hidde)
                    })
                }),
                Z("div").class("attachment", "d-flex").children(
                    Z("button").class(style["icon"]).children(new Icon("mic")),
                    Z("button").class(style["icon"]).children(new Icon("plane")).click(() => {
                        this.sendMessage()
                    })
                ),
            )
        )
    }

    sendMessage() {
        /* TODO: aqui vai ter que chamar o use case que cria mensagem e manda pro repositorio */
        /* this.chatbody.children(Z("div").HTML(this.input.element.innerHTML))
        this.input.element.innerHTML = "" */
    }
}