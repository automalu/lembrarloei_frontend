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
import Button from "../../../component1.1/atoms/buttons";

export default class AbaLembretes extends AbaComponente {
    value = "lembretes"
    titulo = "Lembretes"
    componente: Zeyo = Z("div")
    async create(obj?: any): Promise<Zeyo> {
        const [itens, horizontal] = new ListaHorizontal(this.app, CardSimple).watch({
            adapter: new Adapter("empty"),
            title: "Lembretes",
            list: ([] as any[])
        });
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
            new Button().text("Criar").click(() =>
                Modal.show(this.app, new FormSelectTipoItem(this.app, { title: "", description: "" }, itens))
            ),
            await horizontal.create(itens),
        )
    }
}