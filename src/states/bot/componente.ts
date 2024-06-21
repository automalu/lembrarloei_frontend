import Z, { Zeyo } from "zeyo";
import App from "../../app";
import { StateBaseConstructor } from "../../navigation/state";
import ListaHorizontal from "../../component1.1/listaHorizontal";
import CardSimple from "../../component1.1/cardSimple";
export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        statusMap: { [key: string]: Zeyo } = {}
        constructor(...params: any[]) {
            super(params)
        }
        async setComponente(app: App) {
            return Z("div").class("flex-state-component").children(
                new ListaHorizontal(app, "Seus Bots").object(o => {
                    o.pushHeader(
                        Z("button").text("Criar").click(() => o.push(new CardSimple(app, "Teste", "description")))
                    )
                }),
            )
        }
    }
}