import Z from "zeyo";
import App from "../../app";
import AdapterEmpty from "../../component/adapter";
import CardSimple from "../../component/cardSimple";
import ListaHorizontal from "../../component/listaHorizontal";
import FormCreateEstabelecimento from "../../features/estabelecimento/forms/create";
import Modal from "../../modal";
import { StateBaseConstructor } from "../../navigation/state";

export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App) {
            const [itens, horizontal] = new ListaHorizontal(app, CardSimple).watch({
                adapter: new AdapterEmpty("empty"),
                title: "Itens",
                list: ([] as { title: string, description: string }[])
            })
            return Z("div").class("state-component").children(
                Z("button").text("Add").click(() =>
                    Modal.show(app, new FormCreateEstabelecimento(app))
                ),
                await horizontal.create(itens),
            )
        }
    }
}