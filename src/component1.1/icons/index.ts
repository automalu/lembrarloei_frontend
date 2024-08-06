import { ZeyoAs } from "zeyo";
import SVG, { SVGmap } from "./svgs/_list";

export default class Icon extends ZeyoAs<"i"> {
    name: keyof SVGmap
    constructor(name: keyof SVGmap) {
        super("i")
        this.name = name
        this.HTML(SVG.list[name])
    }

    setIcons(name: keyof SVGmap){
        this.name = name
        this.HTML(SVG.list[name])
    }
}