import { ZeyoAs } from "zeyo";
import style from "./style.module.css"

export default class Input extends ZeyoAs<"input"> {
    static style = style.input;
    constructor() {
        super("input")
        this.class(style.input)
    }
}