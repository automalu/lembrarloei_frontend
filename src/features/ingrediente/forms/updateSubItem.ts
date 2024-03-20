import Z, { ZeyoAs } from "zeyo";
import App from "../../../app";
import WaitText from "../../../component/text/waitText";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import UpdateItem from "../controllers/update";
import FormCreateSabor from "./createSabor";
import FormUpdateSabor from "./updateSabor";

export default class FormUpdateSubItem extends Form {
    model: any;
    lista: any;
    app: App;
    name: string;
    constructor(app: App, model: any, lista: any) {
        super(model, model.titulo, new UpdateItem(app), {back: "none", next: "Atualizar"})
        this.app = app
        this.model = model
        this.lista = lista
        this.name = model.titulo;
    }
    async setObject(o: ZeyoAs<"div">){
        console.log("++++++++>>>", o)
        o.HTML("").children(WaitText("b", ""))
        const [result, err] = await this.app.repository.findOne("Itens", {
            estabelecimento: this.model.estabelecimento,
            _id: this.model.item
        })
        o.HTML("").click(() => {}).class("d-flex", "gap-m", "a-center").children(result.titulo, Z("button").class("inner").children(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
        ).clickevent(async e => {
            e.preventDefault()
            console.log("REMOVENTO SUBITEM")
            o.HTML("").children(WaitText("b", "Removendo"))
            const [result, err] = await this.app.repository.delete("SubItens", this.model._id)
            console.log(result,err)
            o.element.remove()
        }))
    }
    async getFields(): Promise<Fields> {
        const fields: Fields = {
            "tipo": Field.make("show", "tipo"),
            "titulo": Field.make("text", "Título", "Texto"),
            "descricao": Field.make("text", "Descrição", "Texto"),
            "preco": Field.make("text", "Preço", "30,00"),
            "ingredientes": Field.make("objecth", "Ingredientes", []),
            "sabores": Field.make("objecth", "Sabores", [new FormCreateSabor(this.app, {item: this.model._id, tipo: "sabor"}, [])]),
        };
        return fields
    }
}