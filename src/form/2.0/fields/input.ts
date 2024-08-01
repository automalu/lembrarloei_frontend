import Z, { ZeyoAs } from "zeyo";
import Field from "./field";

export default class FieldInput extends Field {
    __input: ZeyoAs<"input">
    constructor(key: string) {
        super(key)
        this.children(
            this.__input = Z("input").set("id", key)
        )
    }

    setType(type: string) {
        this.__input.set("type", type)
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