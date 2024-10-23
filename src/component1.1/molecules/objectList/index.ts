import Z, { Zeyo, ZeyoAs } from "zeyo";
import App from "../../../app";
import style from "./style.module.css";
import VerticalList from "../../atoms/verticalList";

export default class ObjectList extends ZeyoAs<"div"> {
    main: Zeyo = Z("div");
    app: App
    verticalList: VerticalList;
    constructor(app: App, title: string, list?: typeof VerticalList) {
        super("div")
        this.app = app
        this.class("d-grid", "gap-g", style.list).children(
            Z("div").class("d-flex", "gap-m", style.header).children(Z("h2").text(title)),
            this.verticalList = list ? new list() : new VerticalList()
        )
    }
    pushHeader(z: Zeyo) {
        this.childList[0].children(z)
        return this
    }
    push(...z: Zeyo[]) {
        this.verticalList.push(...z)
        return this
    }
}