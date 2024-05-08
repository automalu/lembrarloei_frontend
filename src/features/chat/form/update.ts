import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";

export default class FormChat extends Form {
    model: any;
    lista: any;
    app: App;
    constructor(app: App, model: any, lista: any) {
        super(model, model.titulo, { execute: async () => { } }, { back: "none", next: "Atualizar" })
        this.app = app
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        const fields: Fields = {
            "tipo": Field.make("chat", this.model.title, {placeholder: "", app: this.app}),
        };
        return fields
    }
}