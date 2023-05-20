import App from "../../../../app";
import Form from "../../../../form";
import { Build, Field } from "../../../../form/field";
import CreateComponente from "../../controllers/createComponente";

export default class FormListaHorizontal extends Form {
    model: any;
    lista: any;
    constructor(app: App, model: any, lista: any) {
        super(model, "Nova Lista Horizontal", new CreateComponente(app), {back: "none", next: "Criar"})
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<{ [key: string]: Field }> {
        return {
            "titulo": Build.field("text", "Título", ""),
        }
    }
}