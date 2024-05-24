import Z, { ZeyoAs } from "zeyo";
import App from "../../../../app";
import style from "../../../component/lista.module.css";
import { Pedido } from "../../entity/pedido";

export default class ComponentRootPedido extends ZeyoAs<"div"> {
    app: App
    zCliente = Z("b")
    zBody = Z("div") 
    constructor(app: App, pedido: Pedido) {
        super("div")
        this.app = app
        this.class("pointer", style.card).children(
            Z("header").children(
                Z("h2").text(pedido.title),
                Z("div").class("data").object(async (o) => {
                    o.children(
                        Z("label").text("Cliente"),
                        this.zCliente.text(pedido.client ? await this.getClientName(pedido.client) : "")
                    )
                })
            ),
            this.zBody
        )
    }

    async getClientName(_id: string) {
        const [cliente] = await this.app.repositoryMemory.findOne("Clientes", { _id });
        return cliente.nome
    }

    setClientName(name: string) {
        this.zCliente.text(name)
    }
}