import App from "../../../app";
import { Field, Fields } from "../../../form/field";
import Form from "../../../form/index";
import Esqueci from "../controller/esqueci";
import User from "../domain/entity/user";

export default class FormEsqueci extends Form {
    constructor(app: App, model: User){
        super(model, "Recuperação de Senha", new Esqueci(app), {back: "none", next: "Enviar"})
    }
    async getFields(): Promise<Fields>{
        return {
            "email": Field.make("text", "E-mail para recuperação", "example@domain.com"),
        }
    }
}