import Z, { ZeyoAs } from "zeyo";

export default class ShowField extends ZeyoAs<"div"> {
    zValue = Z("b")
    constructor(key: string, value: string ) {
        super("div")
        this.class("").children(
            Z("p").text(key),
            this.zValue.text(value)
        )
    }

    setValue(value: string){
        this.zValue.text(value)
    }
}