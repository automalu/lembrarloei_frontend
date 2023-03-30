import Z, { Zeyo } from "zeyo"
import GetValue from "./properties/getValue"
import FormElement from "./_element"

export default class Show extends GetValue(FormElement) {
    constructor(label: string) {
        super("text", label, "")
    }
    create(key: string): Zeyo {
        this.element = Z("p").class("show")
        return Z("div").class("d-grid", "gap-p").children(
            Z("label").text(this.label).atribs({"for": key}),
            this.element,
        )
    }
    setValue(value: any) {
        this.element.element.innerText = value
    }
}