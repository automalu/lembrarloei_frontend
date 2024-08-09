import App from "../../app";
import Abas from "../../component/abas";
import { StateBaseConstructor } from "../../navigation/state";
import AbaCategorias from "./abas/categorias";
import AbaParceiro from "./abas/parceiro";

export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App) {
            return (await new Abas(app)
                .push(new AbaParceiro(app))
                .push(new AbaCategorias(app))
                .create()).class("state-component")
        }
    }
}