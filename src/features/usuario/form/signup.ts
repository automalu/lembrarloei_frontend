import App from "../../../app";
import { Build, Field } from "../../../form/field";
import Form from "../../../form/index";
import Singup from "../controller/singup";
import User from "../domain/entity/user";

export default class FormSignup extends Form{
    constructor(app: App, model: User){
        super(model, "Signup", new Singup(app), {back: "none", next: "Create"})
    }
    async getFields(): Promise<{[key: string]: Field}>{
        return {
            "name": Build.field("text", "Name", "Name"),
            "username": Build.field("text", "Username", "Username"),
            "password": Build.field("password", "Password", "Password")
        }
    }
}