import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import CreateSabor from "../controllers/createSabor";

export default class FormCreateSabor extends Form {
    model: any;
    lista: any;
    name = "Novo"
    constructor(app: App, model: any, lista: any) {
        super(model, "Novo Sabor", new CreateSabor(app), {back: "Voltar", next: "Criar"})
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        return {
            "titulo": Field.make("text", "Título", "Texto"),
            "descricao": Field.make("text", "Descrição", "Texto"),
        }
    }
}