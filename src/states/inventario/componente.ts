import Z from "zeyo";
import App from "../../app";
import CardSimple from "../../component/cardSimple";
import ListaHorizontal from "../../component/listaHorizontal";
import FormItem from "../../features/ingrediente/forms/create";
import Modal from "../../modal";
import { StateBaseConstructor } from "../../navigation/state";

export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App) {
            const [itens, horizontal] = new ListaHorizontal(app, CardSimple).watch({
                adapter: "item",
                title: "Itens",
                list: ([] as { title: string, description: string }[])
            })
            itens.list.push({ title: "Teste0", description: "Testando lista" })
            itens.list.push({ title: "Teste1", description: "Testando lista" })
            itens.list.push({ title: "Teste2", description: "Testando lista" })
            return Z("div").class("criado").children(
                Z("button").text("Add").click(() =>
                    Modal.show(app, new FormItem(app, { title: "", description: "" }, itens))
                ),
                await horizontal.create(itens),
            )
        }
    }
}