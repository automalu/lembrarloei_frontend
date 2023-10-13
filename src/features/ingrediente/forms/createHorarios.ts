import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import CreateItem from "../controllers/createItem";

export default class FormHorarios extends Form {
    model: any;
    lista: any;
    constructor(app: App, model: any) {
        super(model, "Novo Parceiro", new CreateItem(app), {back: "none", next: "Criar"})
        this.model = model
    }
    async getFields(): Promise<Fields> {
        return {
            "titulo": Field.make("text", "Nome", "Nome do Parceiro"),
            "inicio": Field.make("date", "Início", "nomeparceiro"),
            "fim": Field.make("date", "Fim", "Rua Tal numero 0000"),
            "dias": Field.make("checkbox", "Dias", "Estou super empolgado", [
                { name: "Dom", value: 0 },
                { name: "Seg", value: 1 },
                { name: "Ter", value: 2 },
                { name: "Qua", value: 3 },
                { name: "Qui", value: 4 },
                { name: "Sex", value: 5 },
                { name: "Sab", value: 6 },
            ]),
        }
    }
}