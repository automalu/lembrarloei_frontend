import { ZeyoAs } from "zeyo";
import SVG, { SVGmap } from "./svgs/_list";

export default class Icon extends ZeyoAs<"i"> {
    constructor(name: keyof SVGmap) {
        super("i")
        this.HTML(SVG.list[name])
    }
}