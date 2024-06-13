import { ZeyoAs } from "zeyo";
import App from "../../../app";

export default class Info extends ZeyoAs<"div"> {
    constructor(app: App) {
        super("div")
    }
}