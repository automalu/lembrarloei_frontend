import Z, { ZeyoAs } from "zeyo";
import Field from "./field";

export default class Fields extends ZeyoAs<"div"> {
    constructor(){
        super("div")
    }

    childList: Field[] = [];
    children(...child: Array<Field>): this {
        return super.children(...child)
    }
}