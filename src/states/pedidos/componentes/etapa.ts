import App from "../../../app";
import CardSimple from "../../../component1.1/cardSimple";
import ListItensCarrinho from "../../../component1.1/listItensCarrinho";
import ListaHorizontal from "../../../component1.1/listaHorizontal";

export default class Etapa extends ListaHorizontal {
    constructor(app: App, obj: {title: string, query: any}) {
        super(app, obj.title)
        this.object(async (o) => {
            app.repositoryMemory.createTriggerTo("Pedidos", (value) => {
                o.children(
                    new CardSimple(app, value.title, value.status).object(o => {
                        app.repositoryMemory.createTriggerTo("Pedidos", (pedido) => {
                            if(pedido.id === value._id)
                                o.element.remove()
                        }, "update")
                    }).children(
                        new ListItensCarrinho(app, value.carrinho)
                    )
                )
            }, "create")
        })
    }
}