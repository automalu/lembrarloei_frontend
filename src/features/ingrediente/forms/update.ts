import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import UpdateItem from "../controllers/update";

export default class FormUpdateItem extends Form {
    model: any;
    lista: any;
    constructor(app: App, model: any, lista: any) {
        super(model, model.titulo, new UpdateItem(app), {back: "none", next: "Atualizar"})
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        return {
            "tipo": Field.make("show", "tipo"),
            "titulo": Field.make("text", "Título", "Estou super empolgado"),
            "descricao": Field.make("text", "Descrição", "Estou super empolgado"),
            "preco": Field.make("text", "Preço", "30,00"),
            "ingredientes": Field.make("text", "Ingredientes", "30,00"),
        }
    }
}