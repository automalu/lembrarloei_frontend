import Z, { Zeyo, ZeyoAs } from "zeyo"
import GetValue from "./properties/getValue"
import FormElement from "./_element"
export default class Show extends FormElement<"p"> {
    constructor(label: string) {
        super("p", label, "")
    }
    create(key: string): Zeyo {
        return Z("div").class("d-grid", "gap-p").children(
            Z("label").text(this.label).attributes({ "for": key }),
            this.element.class("show"),
        )
    }
    setValue(value: any) {
        this.element.element.innerText = value
    }
}