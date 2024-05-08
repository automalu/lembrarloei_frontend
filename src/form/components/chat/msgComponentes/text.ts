import Z, { ZeyoAs } from "zeyo";
import App from "../../../../app";

export default class ComponentMsgText extends ZeyoAs<"div">{
    constructor(app: App, msg: any) {
        super("div")
        this.children(
            Z("p").text(msg.text),
        )
    }
}