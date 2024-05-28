import Z, { Zeyo } from "zeyo";
import App from "../../../../app";
import { Pedido } from "../../entity/pedido";
import ComponentRootPedido from "./_root";
import Status from "./status";
import ListItensCarrinho from "../../../../component1.1/listItensCarrinho";
import Endereco from "./endereco";
import Botao from "./botao";
const statusMap: { [key: string]: any[] } = {
    started: [{type: "status"}, {type: "itens"}],
    confirmando: [{type: "status"}, {type: "itens"}],
    nafila: [{type: "status"}, {type: "itens"}, {type: "botao", subtype: "iniciarpreparo", needupdate: true}],
    preparando: [{type: "itens"}, {type: "botao", subtype: "finalizarpreparo", needupdate: true}],
    retirada: [{type: "status"}, {type: "botao", subtype: "iniciarcoleta", needupdate: true}],
    coleta: [{type: "status"}, {type: "endereco"}, {type: "botao", subtype: "iniciarcoleta", needupdate: true}],
    enviado: [{type: "endereco"}],
    concluido: [],
}

//TODO: os componentes precisar ser responsavei pela atualizacao da informacao dentro do pedido
const statusListShow: { [key: string]: new (app: App, pedido: Pedido, info: any) => Zeyo } = {
    "status": Status,
    "itens": ListItensCarrinho,
    "endereco": Endereco,
    "botao": Botao,
}
export default class ComponentPedido extends ComponentRootPedido {
    constructor(app: App, pedido: Pedido, statuMapComponent: any) {
        super(app, pedido)
        this.zBody.children(
            ...statusMap[pedido.status].map(info => new statusListShow[info.type](app, pedido, info))
        )
        app.repositoryMemory.createTriggerTo("Pedidos", async (update) => {
            const updateType = Object.keys(update.value)[0]
            switch (updateType) {
                case "status":
                    this.zBody.childList.forEach((info: any, index) => {
                        if (!statusMap[update.value.status].find(i => i.type === info.type && !i.needupdate))
                            this.zBody.removeChild(index)
                    })
                    for (const info of statusMap[update.value.status]) {
                        //console.log(this.zBody.childList.map((i: any) => i.type), statusMap[update.value.status])
                        if (!this.zBody.childList.find((i: any) => i.type === info.type))
                            this.zBody.children(new statusListShow[info.type](app, pedido, info))
                    }
                    for (const child of (statuMapComponent as any[])) {
                        if (child.statusList.find((s: string) => s === update.value.status))
                            return child.children(this)
                    }
                    break;
                //quando troco de cocmponente tem que ir para o componenteEtapa corresponde ao status
                // usando o statuMapComponent
                default:
                    break;
            }
            //TODO: aquit tem que atualizar as propriedades do pedido
        }, "update")

    }
}