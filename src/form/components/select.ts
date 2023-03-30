import Z, { Zeyo } from "zeyo"
import GetValue from "./properties/getValue"
import SetValue from "./properties/setValue"
import FormElement from "./_element"

export default class Select extends SetValue(GetValue(FormElement)) {
    list: {value: string, name: string}[] = []
    constructor(label: string, list: {value: string, name: string}[], placeholder?: string) {
        super("objecth", label, placeholder ? placeholder : "Selecione")
        this.list = list
    }
    create(): Zeyo {
        this.element = Z("select").children(
            Z("option").atribs({"value": "none", "selected": "", "disabled": ""}).text(this.placeholder),
            ...(this.list.map(i => Z("option").atrib("value", i.value).text(i.name)))
        )
        return Z("div").children(
            Z("label").text(this.label),
            this.element
        ).class("d-grid", "gap-p")
    }
}