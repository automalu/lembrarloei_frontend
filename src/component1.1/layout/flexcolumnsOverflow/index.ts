import { ZeyoAs } from "zeyo";
import style from "./style.module.css";

export default class FlexColumnsOverflow extends ZeyoAs<"div"> {
    constructor() {
        super("div")
        this.class("d-flex", "gap-m", style.container)
    }
}