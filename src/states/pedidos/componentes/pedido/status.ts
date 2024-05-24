import App from "../../../../app";
import ShowField from "../../../../component1.1/showField";
import { Pedido } from "../../entity/pedido";
import { Constructor } from "./_lib";

export default class Status extends ShowField{
    type = "status"
    constructor(app: App, pedido: Pedido) {
        super("Status", pedido.status)
        app.repositoryMemory.createTriggerTo("Pedidos", (update) => {
            if(update.id === pedido._id && Object.keys(update.value)[0] === this.type)
                this.setValue(update.value.status)
        }, "update")
    }
}