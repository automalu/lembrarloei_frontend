import Z, { ZeyoAs } from "zeyo";
import App from "../../../../app";
import style from "../../../component/lista.module.css";
import { Pedido } from "../../entity/pedido";
import ShowField from "../../../../component1.1/showField";
import Cliente from "./cliente";

export default class ComponentRootPedido extends ZeyoAs<"div"> {
    app: App
    zBody = Z("div") 
    constructor(app: App, pedido: Pedido) {
        super("div")
        this.app = app
        this.class("pointer", style.card).children(
            Z("header").children(
                Z("h2").text(pedido.title),
                new Cliente(app, pedido),
            ),
            this.zBody
        )
    }

    async getClientName(_id: string) {
        const [cliente] = await this.app.repositoryMemory.findOne("Clientes", { _id });
        return cliente.nome
    }
}