import Z, { Zeyo, ZeyoAs } from "zeyo";

export default class VerticalList extends ZeyoAs<"div"> {
    main: Zeyo = Z("div");
    constructor() {
        super("div")
        this.class("d-grid", "gap-m", "o-auto")
    }
    push(...z: Zeyo[]) {
        this.children(...z)
        return this
    }
}