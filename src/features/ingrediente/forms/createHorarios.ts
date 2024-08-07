import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import CreateHorarios from "../controllers/createHorarios";

export default class FormHorarios extends Form {
    model: any;
    lista: any;
    constructor(app: App, model: any) {
        super(model, "Novo Horário", new CreateHorarios(app), {back: "Voltar", next: "Criar"})
        this.model = model
    }
    async getFields(): Promise<Fields> {
        return {
            "inicio": Field.make("time", "Início"),
            "fim": Field.make("time", "Fim"),
            "dias": Field.make("checkbox", "Dias", "Texto", [
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