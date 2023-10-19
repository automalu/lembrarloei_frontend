import Z from "zeyo";
import App from "../../app";
import Adapter from "../../component/adapter";
import CardSimple from "../../component/cardSimple";
import CardSimpleImagem from "../../component/cardSimpleImagem";
import ListaHorizontal from "../../component/listaHorizontal";
import FormSelectTipoItem from "../../features/ingrediente/forms/select";
import FormUpdateItem from "../../features/ingrediente/forms/update";
import FormUpdateCategoria from "../../features/ingrediente/forms/updatecategoria";
import FormUpdateParceiro from "../../features/ingrediente/forms/updeteParceiro";
import Modal from "../../modal";
import { StateBaseConstructor } from "../../navigation/state";

export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App) {
            const [itens, horizontal] = new ListaHorizontal(app, CardSimpleImagem).watch({
                adapter: new Adapter("empty"),
                title: "Parceiros",
                list: ([] as any[])
            });
            (async () => {
                const [result, err] = await app.repository.findMany("Itens", { estabelecimento: app.session.estabelecimento._id, tipo: "parceiro" })
                if (err) return console.error(result);
                itens.list.push(...result)
            })();
            itens.adapter = new Adapter("full",
                (obj) => {
                    if (obj.tipo === "categoria")
                        Modal.show(app, new FormUpdateCategoria(app, obj, itens.list))
                    if (obj.tipo === "parceiro")
                        Modal.show(app, new FormUpdateParceiro(app, obj, itens.list))
                    else Modal.show(app, new FormUpdateItem(app, obj, itens.list))
                },
                [
                    { component: "title", object: "titulo" },
                    { component: "description", object: "tipo" },
                    { component: "img", object: "img" },
                ]
            )
            return Z("div").class("state-component").children(
                Z("button").text("Criar").click(() =>
                    Modal.show(app, new FormSelectTipoItem(app, { title: "", description: "" }, itens))
                ),
                await horizontal.create(itens),
            )
        }
    }
}