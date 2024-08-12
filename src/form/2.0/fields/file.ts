import Z, { ZeyoAs } from "zeyo";
import Field from "./field";

export default class FieldFile extends Field {
    file: ZeyoAs<"input"> = Z("input").set("type", "file")
    input: ZeyoAs<"input"> = Z("input").set("type", "text")
    constructor(key: string, action: (file: ZeyoAs<"input">, element: FieldFile) => void){
        super(key, true)
        this.class("d-grid", "gap-p").children(
            Z("div").class("d-grid", "gap-p").children(
                this.file.set("id", key),
                Z("button").set("type", "button").text("Enviar").click(() => {
                    console.log("enviando imagem para o servidor")
                    action(this.file, this)
                })
            ),
            this.input
        )
    }
    getValue(): string {
        return this.input.element.value;
    }
    setValue(value: string): this {
        this.input.element.value = value;
        return this;
    }
}