import Z, { ZeyoAs } from "zeyo";
import App from "../../../../app";

export default class ComponentMsgAnswer extends ZeyoAs<"div">{
    constructor(app: App, msg: any) {
        super("div")
        this.children(
            Z("p").text(msg.text),
        )
    }
}