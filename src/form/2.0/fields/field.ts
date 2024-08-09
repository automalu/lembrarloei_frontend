import Z, { ZeyoAs } from "zeyo";

export default abstract class Field extends ZeyoAs<"div"> {
    private __label: ZeyoAs<"label">
    key: string
    isField = true
    toData = false
    constructor(key: string, toData?: boolean){
        super("div")
        this.key = key
        this.toData = toData === true
        this.children(
            this.__label = Z("label").attributes({"for": key}),
        )
    }

    label(text: string) {
        this.__label.text(text)
        return this
    }

    abstract getValue(): string
    abstract setValue(value: string): void
}