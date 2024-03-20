import Z, { ZeyoAs } from "zeyo"
import { Field, Fields } from "./field"
interface Controller {
    execute(form: Form): Promise<void>
}

export default abstract class Form {
    title: string
    data: { [key: string]: any } = {}
    fields: Fields = {}
    footer: { back: string, next: string }
    controller: Controller
    excludecontroller?: Controller
    model: any
    element: ZeyoAs<"form"> = Z("form")
    constructor(model: any, title: string = "", controller: Controller, footer: { back: string, next: string } = { back: "Voltar", next: "none" }, excludeController?: Controller) {
        this.model = model
        this.title = title
        this.controller = controller
        this.footer = footer
        if (excludeController) this.delete = true
        this.excludecontroller = excludeController
    }
    abstract getFields(o?: any): Promise<Fields>

    delete = false
    async onDelete(): Promise<void> {
        if (this.excludecontroller)
            this.excludecontroller.execute(this)
    }

    onSubmit(fields: any) {
        this.setFields(fields)
        this.controller.execute(this)
    }

    setFields(fields: any) {
        for (const key in fields)
            this.data[key] = fields[key].getValue()
        this.fields = fields
    }
}