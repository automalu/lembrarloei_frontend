import Z, { Zeyo } from "zeyo"

import Action from "./properties/action"
import FormElement from "./_element"
import { ActionFunction } from "./_list"

export default class ObjectV extends Action(FormElement<"div">) {
    list: any[] = []
    constructor(label: string, list: any[], action?: ActionFunction) {
        super("div", label, "")
        this.list = list
        if(action) this.action = action
    }
    create(): Zeyo {
        return this.element.children(
            ...(this.list.map(i => Z("div").text(i.name||i.modelo).click(e => this.action(i))))
        ).class("object-list", "d-grid", "gap-m", "max-h-80", "of-auto")
    }
}