import Z, { ZeyoAs } from "zeyo";
import App from "../../../../app";
//import Participante from "../participante";

export default class ComponentMsgSelect extends ZeyoAs<"div">{
    constructor(app: App, msg: any) {
        super("div")
        console.log(msg)
        this.children(
            Z("label").text(msg.label),
            Z("div").class("d-flex").children(
                ...msg.options.map((option: any) => {
                    return Z("button").text(option.name).set("value", option.value)
                })
            ).clickevent((e) => {
                console.log((e.target as HTMLButtonElement).value)
                /* const client = new Participante(app, msg.clientid, true)
                client.setChat({_id: msg.chat})
                const selected = (e.target as HTMLButtonElement).value
                const result = msg.options.find((o: any) => o.value === selected)
                client.createMsg("answer", result.name, {[msg.key]: result.value}) */
            })
        )
    }
}