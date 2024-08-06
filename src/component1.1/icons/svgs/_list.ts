import emoji from "./emoji.svg"
import mic from "./mic.svg"
import paperclip from "./paperclip.svg"
import plane from "./plane.svg"
import arrowdown from "./arrow-down.svg" 
import arrowleft from "./arrow-left.svg" 
import arrowrigth from "./arrow-rigth.svg" 
import arrowup from "./arrow-up.svg"
import pen from "./pen.svg"
import check from "./check.svg"

export interface SVGmap {
    "emoji": string
    "mic": string
    "paperclip": string
    "plane": string
    "arrow-down": string
    "arrow-left": string
    "arrow-rigth": string
    "arrow-up": string
    "pen": string
    "check": string
}
export default class SVG {
    static list: { [key: string]: any } = {
        "emoji": emoji,
        "mic": mic,
        "paperclip": paperclip,
        "plane": plane,
        "arrow-down": arrowdown,
        "arrow-left": arrowleft,
        "arrow-rigth": arrowrigth,
        "arrow-up": arrowup,
        "pen": pen,
        "check": check,
    }
}