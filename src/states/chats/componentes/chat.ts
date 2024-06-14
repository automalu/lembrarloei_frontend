import Z, { ZeyoAs } from "zeyo";
import App from "../../../app";
import SpanContentEditable from "../../../features/contenteditable/component";
/**
 * TODO: 
 * problemas para resolver o caret/cursor fica louco quando volta com a seta ou selecionan
 */
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
                Z("div").class("footer", "d-flex", "gap-m").children(
                    Z("div").class("attachment").children(
                        Z("button").class("icon", "emoji"),
                        Z("button").class("icon", "plus")
                    ),
                    Z("div").class("w-100").children(
                        this.input = new SpanContentEditable(app).text("Inserir Mensagem"),
                    ),
                    Z("div").class("attachment").children(
                        Z("button").class("icon", "mic"),
                        Z("button").class("icon", "send").text("enviar").click(() => {
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

    /* lexical(str: string) {
        let result = ""
        let aux = ""
        const states: { [key: string]: string } = {
            "normal": result,
            "strong": aux
        }
        let state = "normal"
        for (const c of str) {
            if (c === "*" && state === "normal") {
                states[state] += c
                state = "strong"
                continue
            } else
                if (c === "*" && state === "strong") {
                    state = "normal"
                    states[state] += `<strong>${aux}</strong>`
                    states[state] += c
                    continue
                }

            states[state] += c
        }
        return result
    } */
}