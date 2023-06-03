import App from "../../../app";
import { Field, Fields } from "../../../form/field";
import Form from "../../../form/index";
import Login from "../controller/login";
import User from "../domain/entity/user";

export default class FormLogin extends Form {
    constructor(app: App, model: User){
        super( model, "Login", new Login(app), {back: "none", next: "Enter"})
    }
    async getFields(): Promise<Fields>{
        return {
            "username": Field.make("text", "Username", "Username"),
            /* "password": Field.make("password", "Password", "Password", undefined, ["esqueci"]) */
            "password": Field.make("password", "Password", "Password")
        }
    }
}