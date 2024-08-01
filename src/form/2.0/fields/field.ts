import Z, { ZeyoAs } from "zeyo";

export default abstract class Field extends ZeyoAs<"div"> {
    private __label: ZeyoAs<"label">
    key: string
    constructor(key: string){
        super("div")
        this.key = key
        this.children(
            this.__label = Z("label").attributes({"for": key}),
        )
    }

    label(text: string) {
        this.__label.text(text)
        return this
    }

    abstract getValue(): string
}