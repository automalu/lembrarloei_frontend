import App from "../../../../app";
import ShowField from "../../../../component1.1/showField";
import { Pedido } from "../../entity/pedido";
import { Constructor } from "./_lib";

export default class Endereco extends ShowField{
    type = "endereco"
    constructor(app: App, pedido: Pedido) {
        super("Endereco", "")
    }
}