import { ZeyoAs } from "zeyo";
import App from "../../../../app";
import ShowField from "../../../../component1.1/showField";
import { Pedido } from "../../entity/pedido";
import { Constructor } from "./_lib";
const subtypeactions: {[key: string]: any} = {
    "iniciarpreparo": {text: "Iniciar Preparo", status: "preparando"},
    "finalizarpreparo": {text: "Finalizar Preparo", status: "retirada"},
    "iniciarcoleta": {text: "Iniciar Coleta", status: "concluido"},
}
export default class Botao extends ZeyoAs<"button">{
    type = "botao"
    constructor(app: App, pedido: Pedido, info: any) {
        super("button")
        this.text(subtypeactions[info.subtype].text).click(() => {
            app.repositoryMemory.update("Pedidos", pedido._id, {status: subtypeactions[info.subtype].status})
        })
    }
}