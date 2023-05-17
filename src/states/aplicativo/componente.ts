import Z from "zeyo";
import App from "../../app";
import Adapter from "../../component/adapter";
import CardSimple from "../../component/cardSimple";
import ListaHorizontal from "../../component/listaHorizontal";
import FormSelectTipoItem from "../../features/ingrediente/forms/select";
import FormUpdateItem from "../../features/ingrediente/forms/update";
import FormUpdateCategoria from "../../features/ingrediente/forms/updatecategoria";
import Modal from "../../modal";
import { StateBaseConstructor } from "../../navigation/state";

export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App) {
            const [itens, horizontal] = new ListaHorizontal(app, CardSimple).watch({
                adapter: new Adapter("empty"),
                title: "Componentes",
                list: ([] as any[])
            });
            /* (async () => {
                const [result, err] = await app.repository.findMany("Componentes", { estabelecimento: app.session.estabelecimento._id })
                if (err) return console.error(result);
                itens.list.push(...result)
            })();
            itens.adapter = new Adapter("full",
                (obj) => {
                    if (obj.tipo === "categoria")
                        Modal.show(app, new FormUpdateCategoria(app, obj, itens.list))
                    else Modal.show(app, new FormUpdateItem(app, obj, itens.list))
                },
                [
                    { component: "title", object: "titulo" },
                    { component: "description", object: "tipo" }
                ]
            ) */
            return Z("div").class("criado").children(
                Z("button").text("Criar").click(() =>
                    Modal.show(app, new FormSelectTipoItem(app, { title: "", description: "" }, itens))
                ),
                await horizontal.create(itens),
            )
        }
    }
}