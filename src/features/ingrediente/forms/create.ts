import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import CreateItem from "../controllers/createItem";

export default class FormItem extends Form {
    model: any;
    lista: any;
    constructor(app: App, model: any, lista: any) {
        super(model, "Novo Item", new CreateItem(app), {back: "none", next: "Criar"})
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        return {
            "titulo": Field.make("text", "Título", "Estou super empolgado"),
            "descricao": Field.make("text", "Descrição", "Estou super empolgado"),
            "preco": Field.make("text", "Preço", "30,00"),
        }
    }
}