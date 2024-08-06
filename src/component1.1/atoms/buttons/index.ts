import { ZeyoAs } from "zeyo";
import style from "./style.module.css"

export default class Button extends ZeyoAs<"button"> {
    constructor() {
        super("button")
        this.class(style.button)
    }
}