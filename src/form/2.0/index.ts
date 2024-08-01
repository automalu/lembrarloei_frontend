import Z, { ZeyoAs } from "zeyo";
import Field from "./fields/field";
import Fields from "./fields";

export default abstract class Form extends ZeyoAs<"form"> {
    title: ZeyoAs<"h2">
    header: ZeyoAs<"header">
    body: ZeyoAs<"div">
    footer: ZeyoAs<"div">
    ready = true
    abstract onSubmit(): void
    fields: Fields
    constructor() {
        super("form")
        this.class("d-grid", "gap-m", "ac-between").children(
            this.body = Z("div").class("d-grid", "gap-m", "o-auto").children(
                this.header = Z("header").class("d-flex", "jc-between").children(
                    this.title = Z("h2").text("Title"),
                    //form.delete ? Z("i").class("pointer").click(() => form.onDelete()).children(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="30px" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`): "",
                ),
                this.fields = new Fields()
                /* TODO: o back tem que estar depois do header
                Z("button").text(form.footer.back).click(() => {
                    Modal.back()
                }).class("aux").attribute("type", "button") */
                /* TODO: aqui tem que colocar o voltar */
                /* ...Object.keys(this.fields).map(k => {
                    //console.log(this.fields[k])
                    const z = this.fields[k].create(k)
                    this.fields[k].setValue(form.model[k])
                    this.fields[k].element.element.id = k
                    return z
                }) */
            ),
            this.footer = Z("div").class("d-flex", "gap-m", "footer")
        ).object(z => z.element.onsubmit = e => {
            e.preventDefault()
            this.onSubmit()
        })
    }

    fieldsToObject(){
        const data: { [key: string]: Field } = {}
        this.fields.childList.forEach(f => data[f.key] = f)
        return data
    }
}