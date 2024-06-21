import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import UpdateItem from "../controllers/update";
import FormCreateSabor from "./createSabor";
import FormSelectCategoria from "./selectCategoria";
import FormUpdateSabor from "./updateSabor";

export default class FormUpdateItem extends Form {
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
            "ingredientes": Field.make("objecth", "Ingredientes", []),
            "sabores": Field.make("objecth", "Sabores", [new FormCreateSabor(this.app, {item: this.model._id, tipo: "sabor"}, [])]),
            "categorias": Field.make("objecth", "Categorias", [new FormSelectCategoria(this.app, this.model, [])]).object(async f => {
				const [result, err] = await this.app.repository.findMany("ParentsItem", {
					estabelecimento: this.model.estabelecimento,
					subitem: this.model._id
				})
				if (err) return
				const lista: any[] = []
				result.forEach(i => lista.push(new FormUpdateItem(this.app, i, lista)))
				lista.push(new FormSelectCategoria(this.app, this.model, lista))
				f.element.HTML("").children(...Field.make("objecth", "Categorias", lista).create().childList)
			})
        };
        (async () => {
            const [result, err] = await this.app.repository.findMany("Itens", {
                estabelecimento: this.app.session.estabelecimento._id,
                tipo: "sabor",
                item: this.model._id
            })
            if(err) return

            const list: any[] = [];
            result.forEach(r => list.push(new FormUpdateSabor(this.app, r, [])));
            list.push(new FormCreateSabor(this.app, {item: this.model._id, tipo: "sabor"}, []));

            fields["sabores"].element.HTML("").children(...Field.make("objecth", "Sabores", list).create().childList)
        })();
        return fields
    }
}