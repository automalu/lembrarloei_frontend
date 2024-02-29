import Z from "zeyo";
import App from "../../app";
import Adapter from "../../component/adapter";
import CardSimple from "../../component/cardSimple";
import ListaHorizontal from "../../component/listaHorizontal";
import FormSelectTipoItem from "../../features/ingrediente/forms/select";
import FormUpdateItem from "../../features/ingrediente/forms/update";
import FormUpdateCategoria from "../../features/ingrediente/forms/updatecategoria";
import FormUpdateConjunto from "../../features/ingrediente/forms/updateConjunto";
import FormUpdateParceiro from "../../features/ingrediente/forms/updeteParceiro";
import Modal from "../../modal";
import { StateBaseConstructor } from "../../navigation/state";
const formUpdateList: {[key: string]: any} = {
    categoria: FormUpdateCategoria,
    conjunto: FormUpdateConjunto,
    item: FormUpdateItem,
    parceiro: FormUpdateParceiro
}
export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App) {
            const [itens, horizontal] = new ListaHorizontal(app, CardSimple).watch({
                adapter: new Adapter("empty"),
                title: "Itens",
                list: ([] as any[])
            });
            (async () => {
                const [result, err] = await app.repository.findMany("Itens", { estabelecimento: app.session.estabelecimento._id })
                if (err) return console.error(result);
                itens.list.push(...result)
            })();
            itens.adapter = new Adapter("full",
                (obj) => {
                    if(Object.prototype.hasOwnProperty.call(formUpdateList, obj.tipo))
                        Modal.show(app, new formUpdateList[obj.tipo](app, obj, itens.list))
                    else Modal.show(app, new formUpdateList["item"](app, obj, itens.list))
                },
                [
                    { component: "title", object: "titulo" },
                    { component: "description", object: "tipo" }
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