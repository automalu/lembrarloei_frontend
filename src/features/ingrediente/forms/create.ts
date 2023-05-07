import App from "../../../app";
import Form from "../../../form";
import { Build, Field } from "../../../form/field";
import CreateItem from "../controllers/createItem";

export default class FormItem extends Form {
    model: any;
    lista: any;
    constructor(app: App, model: any, lista: any) {
        super(model, "Novo Item", new CreateItem(app), {back: "none", next: "Criar"})
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<{ [key: string]: Field }> {
        return {
            "titulo": Build.field("text", "Título", "Estou super empolgado"),
            "descricao": Build.field("text", "Descrição", "Estou super empolgado"),
            "preco": Build.field("text", "Preço", "30,00"),
        }
    }
}