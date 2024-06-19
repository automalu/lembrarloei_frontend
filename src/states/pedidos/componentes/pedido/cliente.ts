import App from "../../../../app";
import ShowField from "../../../../component1.1/showField";
import { Pedido } from "../../entity/pedido";

export default class Cliente extends ShowField{
    type = "cliente"
    app: App
    constructor(app: App, pedido: Pedido) {
        super("Cliente", "")
        this.app = app
        this.class("ta-right").object(async (o) => {
            o.setValue(pedido.client ? await this.getClientName(pedido.client) : "")
            app.repositoryMemory.createTriggerTo("Pedidos", async (update) => {
                console.log(Object.keys(update.value)[0])
                if(update.id === pedido._id && Object.keys(update.value)[0] === this.type)
                    this.setValue(await this.getClientName(update.value[this.type]))
            }, "update")
        })
    }

    async getClientName(_id: string) {
        const [cliente] = await this.app.repositoryMemory.findOne("Clientes", { _id });
        return cliente.nome
    }
}
