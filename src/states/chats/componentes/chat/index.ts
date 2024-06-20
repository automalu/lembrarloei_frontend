import Z, { ZeyoAs } from "zeyo";
import App from "../../../../app";
import SpanContentEditable from "../../../../features/contenteditable/component";
import style from "./style.module.css"
import Icon from "../../../../component1.1/icons";
import Message from "./message";
import Participante from "../../../../form/components/chat/participante";
import ChatBody from "./body";
import { ChangeSlide } from "../../../../component1.1/layout/columnsToTab";

export default class Chat extends ZeyoAs<"div"> {
    name = "chat"
    input: SpanContentEditable
    title: ZeyoAs<"h2"> = Z("h2").text("Conversa")
    body: ChatBody
    participante: Participante
    constructor(app: App, participante: Participante, changeSlide: ChangeSlide) {
        super("div")
        this.participante = participante
        this.class("d-grid", "gap-m", style.container).children(
            Z("header").class("d-flex", "gap-g", "a-center").children(
                new Icon("arrow-left").class("icon-size").click(() => {
                    changeSlide({name: "home"})
                }),
                this.title,
            ),
            Z("div").class("d-grid", style.body).children(
                this.body = new ChatBody(app, participante)
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

    setup(data: any) {
        this.participante.setChat(data)
        this.title.text(data.title);
        this.body.setChat(data)
    }

    setChat(chat: any) {
        this.participante.setChat(chat)
    }

    sendMessage() {
        this.participante.createMsg("text", this.input.element.innerHTML)
        this.input.element.innerHTML = ""
    }
}