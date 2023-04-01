import App from "../../../app";
import { Build, Field } from "../../../form/field";
import Form from "../../../form/index";
import Esqueci from "../controller/esqueci";
import User from "../domain/entity/user";

export default class FormEsqueci extends Form {
    constructor(app: App, model: User){
        super(model, "Recuperação de Senha", new Esqueci(app), {back: "none", next: "Enviar"})
    }
    async getFields(): Promise<{[key: string]: Field}>{
        return {
            "email": Build.field("text", "E-mail para recuperação", "example@domain.com"),
        }
    }
}