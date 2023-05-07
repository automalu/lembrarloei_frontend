import App from "../../../app";
import Form from "../../../form";
import { Build, Field } from "../../../form/field";
import CreateItem from "../controllers/createItem";
import UpdateItem from "../controllers/update";

export default class FormUpdateItem extends Form {
    model: any;
    lista: any;
    constructor(app: App, model: any, lista: any) {
        super(model, model.titulo, new UpdateItem(app), {back: "none", next: "Atualizar"})
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<{ [key: string]: Field }> {
        return {
            "tipo": Build.field("show", "tipo"),
            "titulo": Build.field("text", "Título", "Estou super empolgado"),
            "descricao": Build.field("text", "Descrição", "Estou super empolgado"),
            "preco": Build.field("text", "Preço", "30,00"),
            "ingredientes": Build.field("text", "Ingredientes", "30,00"),
        }
    }
}