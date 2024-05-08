import Z, { ZeyoAs } from "zeyo";
import App from "../../../../app";
//import Participante from "../participante";

export default class ComponentMsgInput extends ZeyoAs<"div"> {
    input: ZeyoAs<"input">
    constructor(app: App, msg: any) {
        super("div")
        this.children(
            Z("label").text(msg.label).attributes({ "for": msg.key }),
            Z("form").children(
                this.input = Z("input").set("type", msg.inputType).set("placeholder", msg.placeholder),
                Z("input").set("type", "submit").set("value", "Enviar"),
            ).on("submit", (o, e) => {
                e.preventDefault()
                //conectar isso com o outro
                /* const client = new Participante(app, msg.clientid, true)
                client.setChat({ _id: msg.chat })
                const value = this.input.element.value
                client.createMsg("answer", value, {[msg.key]: value }) */
            })
        )
    }
}