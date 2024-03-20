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
        o.HTML("").click(() => {}).class("d-flex", "gap-m", "a-center").children(result.titulo, Z("button").text("x").clickevent(e => {
            e.preventDefault()
            console.log("REMOVENTO SUBITEM")
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