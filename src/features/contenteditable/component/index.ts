import { ZeyoAs } from "zeyo";
import Lexical from "../lexical";
import App from "../../../app";
import style from "./style.module.css"

export default class SpanContentEditable extends Lexical(ZeyoAs<"span">) {
    constructor(app: App) {
        super("span")
        this.attribute("contenteditable", "true").class(style.contenteditable)
    }
}