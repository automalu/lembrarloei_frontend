import App from "../../../../app";
import ShowField from "../../../../component1.1/showField";
import { Pedido } from "../../entity/pedido";
import { Constructor } from "./_lib";

export default class Cliente extends ShowField{
    type = "client"
    app: App
    constructor(app: App, pedido: Pedido) {
        super("Cliente", "")
        this.app = app
        this.object(async (o) => {
            o.setValue(pedido.client ? await this.getClientName(pedido.client) : "")
            app.repositoryMemory.createTriggerTo("Pedidos", (update) => {
                if(update.id === pedido._id && Object.keys(update.value)[0] === this.type)
                    this.setValue(update.value.status)
            }, "update")
        })
        
    }
    async getClientName(_id: string) {
        const [cliente] = await this.app.repositoryMemory.findOne("Clientes", { _id });
        return cliente.nome
    }
}