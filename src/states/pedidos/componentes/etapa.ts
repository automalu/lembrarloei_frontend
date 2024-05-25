import App from "../../../app";
import CardSimple from "../../../component1.1/cardSimple";
import ListItensCarrinho from "../../../component1.1/listItensCarrinho";
import ListaHorizontal from "../../../component1.1/listaHorizontal";
import ComponentPedido from "./pedido";

const statusMap: { [key: string]: any } = {}

export default class Etapa extends ListaHorizontal {
    constructor(app: App, title: string, statusList: string[]) {
        super(app, title)
        statusList.forEach(s => statusMap[s] = this)
        this.object(async (o) => {

            //TODO: tenho que tirar daqui e so ativar para a etapa Abertos ou deixar em outro lugar, o que é melhor
            app.repositoryMemory.createTriggerTo("Pedidos", (value) => {
                o.children(
                    new ComponentPedido(app, value, statusMap),
                )
            }, "create")
        })
    }
}