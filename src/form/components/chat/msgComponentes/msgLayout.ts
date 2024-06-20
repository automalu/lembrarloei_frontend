import Z, { ZeyoAs } from "zeyo";

export default class MsgLayout extends ZeyoAs<"div"> {
    body: ZeyoAs<"div">
    info: ZeyoAs<"b">
    constructor(msg: any) {
        super("div")
        this.children(
            this.body = Z("div"),
            this.info = Z("b").text(msg.owner)
        )
    }
}