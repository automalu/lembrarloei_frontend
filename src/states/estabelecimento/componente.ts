import Z from "zeyo";
import App from "../../app";
import { StateBaseConstructor } from "../../navigation/state";

export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App) {
            return Z("div").class("state-component").children(
                Z("h2").text("Dashboard"),
                "Aqui tera um dashboard com estatiscas dos pedidos, inventario e aplicativo"
            )
        }
    }
}