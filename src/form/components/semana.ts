import Z, { Zeyo, ZeyoAs } from "zeyo"
import Action from "./properties/action"
import FormElement from "./_element"
import { ActionFunction } from "./_list"

export default class Semana extends Action(FormElement<"div">) {
    list: any[] = []
    botao: { action: ActionFunction, text: string }
    constructor(list: any[], botao: { action: ActionFunction, text: string }, action?: ActionFunction, label?: string) {
        super("div", label ? label : "", "")
        this.list = list
        this.botao = botao
        if (action) this.action = action
    }
    create(): Zeyo {
        return this.element.class("d-grid", "gap-p").children(
            Z("label").object(e => e.element.innerText = this.label),
            Z("button").class("pointer").set("type", "button").click(() => this.botao.action()).text(this.botao.text),
            Z("div").class("d-flex", "jc-between").children(
                ...this.list.map(i => Z("div").class("pointer").text(i.name || i.modelo).click(e => this.action(i)))
            )
        )
    }

    getValue() {
        return new Date(this.element.element.value)
    }

    setValue(value: Date) {
       
    }
}