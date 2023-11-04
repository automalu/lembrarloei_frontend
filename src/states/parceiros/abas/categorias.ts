import Z, { Zeyo } from "zeyo";
import AbaComponente from "../../../component/abas/aba/componente";
import Adapter from "../../../component/adapter";
import CardSimple from "../../../component/cardSimple";
import ListaHorizontal from "../../../component/listaHorizontal";
import FormSelectTipoItem from "../../../features/ingrediente/forms/select";
import FormUpdateItem from "../../../features/ingrediente/forms/update";
import FormUpdateCategoria from "../../../features/ingrediente/forms/updatecategoria";
import FormUpdateParceiro from "../../../features/ingrediente/forms/updeteParceiro";
import Modal from "../../../modal";

export default class AbaCategorias extends AbaComponente {
    value = "categorias"
    titulo = "Categorias"
    componente: Zeyo = Z("div")
    async create(obj?: any): Promise<Zeyo> {
        const [itens, horizontal] = new ListaHorizontal(this.app, CardSimple).watch({
            adapter: new Adapter("empty"),
            title: "Categorias",
            list: ([] as any[])
        });
        (async () => {
            const [result, err] = await this.app.repository.findMany("Itens", { estabelecimento: this.app.session.estabelecimento._id, tipo: "categoria" })
            if (err) return console.error(result);
            itens.list.push(...result)
        })();
        itens.adapter = new Adapter("full",
            (obj) => {
                Modal.show(this.app, new FormUpdateCategoria(this.app, obj, itens.list))
            },
            [
                { component: "title", object: "titulo" },
                { component: "description", object: "tipo" },
            ]
        )
        return this.componente.children(
            Z("button").text("Criar").click(() =>
                Modal.show(this.app, new FormSelectTipoItem(this.app, { title: "", description: "" }, itens))
            ),
            await horizontal.create(itens),
        )
    }
}