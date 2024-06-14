import { ZeyoAs } from "zeyo";
import Lexical from "../lexical";
import App from "../../../app";
import style from "./style.module.css"

export default class SpanContentEditable extends Lexical(ZeyoAs<"span">) {
    constructor(app: App, cb: (o?: any) => void) {
        super("span")
        let shift = false
        this.attribute("contenteditable", "true").class(style.contenteditable).on("keydown", (o, e) => {
            if (document.activeElement === o.element) {
                if (e.key === "Enter" && !shift) {
                    e.preventDefault()
                    this.states["normal"].data = ""
                    cb()
                } else if (e.key === "Shift") shift = true
            }
        }).on("keyup", (o, e) => {
            if (document.activeElement === o.element && e.key === "Shift") {
                shift = false
            }
        })
    }
}