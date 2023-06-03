import App from "../../../../app";
import Form from "../../../../form";
import { Field, Fields } from "../../../../form/field";

export default class FormUpdateListaHorizontal extends Form{
    constructor(app: App, model: any) {
        super(model, model.titulo, ({} as any), {back: "none", next: "Atualizar"})
    }
    async getFields(): Promise<Fields> {
        return {
            "titulo": Field.make("show", "Titulo")
        }
    }
}