import Button from "..";
import style from "../style.module.css"

export default class ButtonAccent extends Button {
    constructor(text: string) {
        super()
        this.text(text).class(style.accent)
    }
}