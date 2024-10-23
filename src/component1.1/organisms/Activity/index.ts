import Z, { ZeyoAs } from "zeyo";
import style from "./style.module.css";


export default class CardActivity extends ZeyoAs<"div"> {
    constructor() {
        super("div");
        this.class(style.activity).children(
            Z("b").text(`Você`),
            Z("span").text(" criou esse cliente.")
        )
    }

    setInfo(client: any): this {
        return this;
    }
}