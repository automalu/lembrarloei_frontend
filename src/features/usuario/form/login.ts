import App from "../../../app";
import { Build, Field } from "../../../form/field";
import Form from "../../../form/index";
import Login from "../controller/login";
import User from "../domain/entity/user";

export default class FormLogin extends Form {
    constructor(app: App, model: User){
        super( model, "Login", new Login(app), {back: "none", next: "Enter"})
    }
    async getFields(): Promise<{[key: string]: Field}>{
        return {
            "username": Build.field("text", "Username", "Username"),
            /* "password": Build.field("password", "Password", "Password", undefined, ["esqueci"]) */
            "password": Build.field("password", "Password", "Password")
        }
    }
}