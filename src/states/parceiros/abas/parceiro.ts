import Z, { Zeyo } from "zeyo";
import AbaComponente from "../../../component/abas/aba/componente";
import Adapter from "../../../component/adapter";
import CardSimpleImagem from "../../../component/cardSimpleImagem";
import ListaHorizontal from "../../../component/listaHorizontal";
import FormSelectTipoItem from "../../../features/ingrediente/forms/select";
import FormUpdateItem from "../../../features/ingrediente/forms/update";
import FormUpdateCategoria from "../../../features/ingrediente/forms/updatecategoria";
import FormUpdateParceiro from "../../../features/ingrediente/forms/parceiro/update";
import Modal from "../../../modal";
import Button from "../../../component1.1/atoms/buttons";

export default class AbaParceiro extends AbaComponente {
    selected = true
    value = "parceiro"
    titulo = "Parceiro"
    componente: Zeyo = Z("div")
    async create(obj?: any): Promise<Zeyo> {
        const [itens, horizontal] = new ListaHorizontal(this.app, CardSimpleImagem).watch({
            adapter: new Adapter("empty"),
            title: "Parceiros",
            list: ([] as any[])
        });
        (async () => {
            const [result, err] = await this.app.repository.findMany("Itens", { estabelecimento: this.app.session.estabelecimento._id, tipo: "parceiro" })
            if (err) return console.error(result);
            itens.list.push(...result)
        })();
        itens.adapter = new Adapter("full",
            (obj) => {
                if (obj.tipo === "categoria")
                    Modal.show(this.app, new FormUpdateCategoria(this.app, obj, itens.list))
                if (obj.tipo === "parceiro")
                    Modal.show(this.app, (new FormUpdateParceiro(this.app, obj) as any))
                else Modal.show(this.app, new FormUpdateItem(this.app, obj, itens.list))
            },
            [
                { component: "title", object: "titulo" },
                { component: "description", object: "tipo" },
                { component: "img", object: "img" },
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