import { ZeyoAs } from "zeyo";
import SVG from "./svgs/_list";

export default class Icon extends ZeyoAs<"i"> {
    constructor(name: string) {
        super("i")
        this.HTML(SVG.list[name])
    }
}