import Z, { Zeyo } from "zeyo";
import App from "../../../../app";
import { Pedido } from "../../entity/pedido";
import ComponentRootPedido from "./_root";
import Status from "./status";
import ListItensCarrinho from "../../../../component1.1/listItensCarrinho";
import Endereco from "./endereco";
const statusMap: { [key: string]: string[] } = {
    "aberto": ["status", "itens"],
    "confirmando": ["status", "itens"],
    "nafila": ["status", "itens"],
    "retirada": ["status"],
    "coleta": ["status", "endereco"],
    "enviado": ["endereco"],
    "concluido": [],
}

//TODO: os componentes precisar ser responsavei pela atualizacao da informacao dentro do pedido
const statusListShow: { [key: string]: new (app: App, pedido: Pedido) => Zeyo } = {
    "status": Status,
    "itens": ListItensCarrinho,
    "endereco": Endereco,
}
export default class ComponentPedido extends ComponentRootPedido {
    constructor(app: App, pedido: Pedido, statuMapComponent: {[key: string]: Zeyo}) {
        super(app, pedido)
        app.repositoryMemory.createTriggerTo("Pedidos", async (update) => {
            const updateType = Object.keys(update.value)[0]

            switch (updateType) {
                case "status":
                    this.zBody.childList.forEach((info: any) => {
                        if(!statusMap[update.value.status].find(i => i === info.type))
                            info.element.remove()
                    })
                    statusMap[update.value.status].forEach(info => {
                        if(!this.zBody.childList.find((i: any) => i.type === info))
                            this.zBody.children(new statusListShow[info](app, pedido))
                    })
                    break;
                    //quando troco de cocmponente tem que ir para o componenteEtapa corresponde ao status
                    // usando o statuMapComponent
                default:
                    break;
            }
            //TODO: aquit tem que atualizar as propriedades do pedido
        }, "update")
        this.zBody.object
    }
}