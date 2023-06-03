import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import CreateItem from "../controllers/createItem";

export default class FormItemCategoria extends Form {
    model: any;
    lista: any;
    constructor(app: App, model: any, lista: any) {
        super(model, "Nova Categoria", new CreateItem(app), {back: "none", next: "Criar"})
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        return {
            "titulo": Field.make("text", "Título", "Estou super empolgado"),
        }
    }
}