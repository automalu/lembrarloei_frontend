import Z, { ZeyoAs } from "zeyo";
import Field from "./field";
import Input from "../../../component1.1/atoms/inputs";

export default class FieldSelect extends Field {
    __input: ZeyoAs<"select">
    constructor(key: string, toData?: boolean) {
        super(key, toData === true)
        this.class("d-grid", "gap-p").children(
            this.__input = Z("select").class(Input.style)
        )
    }

    options(...options: { value: string, name: string }[]) {
        this.__input.children(
            ...options.map(({ name, value }) => Z("option").set("value", value).text(name))
        )
        return this
    }

    getValue(): string {
        return this.__input.element.value
    }

    setValue(value: any) {
        this.__input.element.value = value
        return this
    }
}