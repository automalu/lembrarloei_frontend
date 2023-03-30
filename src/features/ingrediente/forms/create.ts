import App from "../../../app";
import Form from "../../../form";
import { Build, Field } from "../../../form/field";
import CreateItem from "../controllers/createItem";

export default class FormItem extends Form {
    model: any;
    lista: any;
    constructor(app: App, model: any, lista: any) {
        super(model, "Criar Ingrediente", new CreateItem(app), {back: "none", next: "Criar"})
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<{ [key: string]: Field }> {
        return {
            "title": Build.field("text", "Título", "Estou super empolgado"),
            "description": Build.field("text", "Título", "Estou super empolgado"),
        }
    }
}