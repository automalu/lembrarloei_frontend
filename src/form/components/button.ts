import Z, { Zeyo } from "zeyo"
import Action from "./properties/action"
import GetValue from "./properties/getValue"
import SetValue from "./properties/setValue"
import FormElement from "./_element"
import { ActionFunction } from "./_list"

export default class Button extends Action(SetValue(GetValue(FormElement))) {
    constructor(label: string, action?: ActionFunction) {
        super("text", label, "")
    }
    create(): Zeyo {
        return this.element = Z("button").click(() => {
            this.action([])
        }).atrib("type", this.type).text(this.label)
    }
}