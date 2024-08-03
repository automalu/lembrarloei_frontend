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
    /* fields: Fields */
    constructor() {
        super("form")
        this.class("d-grid", "gap-m", "ac-between").children(
            this.body = Z("div").class("d-grid", "gap-m", "o-auto").children(
                this.header = Z("header").class("d-flex", "jc-between").children(
                    this.title = Z("h2").text("Title"),
                    //form.delete ? Z("i").class("pointer").click(() => form.onDelete()).children(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="30px" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`): "",
                ),
            ),
            this.footer = Z("div").class("d-flex", "gap-m", "footer")
        ).object(z => z.element.onsubmit = e => {
            e.preventDefault()
            this.onSubmit()
        })
    }

    getFieldsInObject() {
        const data: { [key: string]: Field } = {};
        (function deeploop(childList: any[]) {
            for (const c of childList) {
                if (!c.isField) {
                    deeploop(c.childList);
                    continue;
                }
                data[c.key] = c;
            }
        })(this.body.childList);
        return data
    }

    getField(key: string, childList: any[]): [any, true] | [Field, false] {
        for (const c of childList) {
            if (!c.isField) {
                const [f, e] = this.getField(key, c.childList);
                if (!e) return [f, e];
                continue;
            }
            if (c.key === key) return [c, false];
        }
        return [{}, true]
    }

    getFieldByKey(key: string){
        const [field, err] = this.getField(key, this.body.childList)
        if (err) return undefined
        return field
    }

    getValueByKey(key: string) {
        const [field, err] = this.getField(key, this.body.childList)
        if (err) return undefined
        return field.getValue()
    }
}