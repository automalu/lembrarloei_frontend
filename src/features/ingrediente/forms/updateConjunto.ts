import { Zeyo } from "zeyo";
import App from "../../../app";
import WaitText from "../../../component/text/waitText";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import FormCreateRegras from "../../regras/form";
import FormUpdateRegras from "../../regras/form/update";
import UpdateItem from "../controllers/update";
import FormSelectItem from "./selectItem";
import FormUpdateSubItem from "./updateSubItem";

export default class FormUpdateConjunto extends Form {
    model: any;
    lista: any;
    app: App;
    constructor(app: App, model: any, lista: any) {
        super(model, model.titulo, new UpdateItem(app), {back: "none", next: "Atualizar"})
        this.app = app
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        const fields: Fields = {
            "tipo": Field.make("show", "tipo"),
            "titulo": Field.make("text", "Título", "Texto"),
            "descricao": Field.make("text", "Descrição", "Texto"),
            "preco": Field.make("text", "Preço", "30,00"),
            "itens": Field.make("objecth", "Itens", [new FormSelectItem(this.app, {}, [])]).object(async f => {
                const [result, err] = await this.app.repository.findMany("SubItens", {
                    estabelecimento: this.model.estabelecimento,
                    parent: this.model._id
                })
                const lista: any[] = []
				result.forEach(i => lista.push(new FormUpdateSubItem(this.app, i, [])))
				lista.push(new FormSelectItem(this.app, this.model, []))
                f.element.HTML("").children(...Field.make("objecth", "Itens", lista).create().childList)
            }),
            "regras": Field.make("objecth", "Regras", [new FormCreateRegras(this.app, this.model)]).object(async f => {
                const [result, err] = await this.app.repository.findMany("Regras", {
                    estabelecimento: this.model.estabelecimento,
                    parent: this.model._id
                })
                const lista: any[] = []
				result.forEach(i => lista.push(new FormUpdateRegras(this.app, i)))
				lista.push(new FormCreateRegras(this.app, this.model))
                f.element.HTML("").children(...Field.make("objecth", "Regras", lista).create().childList)
            }),
        };
        return fields
    }
}