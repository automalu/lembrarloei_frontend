import App from "../../../app";
import { Field, Fields } from "../../../form/field";
import Form from "../../../form/index";
import Singup from "../controller/singup";
import User from "../domain/entity/user";

export default class FormSignup extends Form{
    constructor(app: App, model: User){
        super(model, "Signup", new Singup(app), {back: "none", next: "Create"})
    }
    async getFields(): Promise<Fields>{
        return {
            "name": Field.make("text", "Name", "Name"),
            "username": Field.make("text", "Username", "Username"),
            "password": Field.make("password", "Password", "Password")
        }
    }
}