import Extra from "../../../core/entity/extra";
import { Field } from "../../../core/entity/field";
import Login from "./login";

export default class Forms {
    static list: {[key: string]: any} = {
        "login": Login
    }
}