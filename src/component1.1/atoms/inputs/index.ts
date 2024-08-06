import { ZeyoAs } from "zeyo";
import style from "./style.module.css"

export default class Input extends ZeyoAs<"input"> {
    constructor() {
        super("input")
        this.class(style.input)
    }
}