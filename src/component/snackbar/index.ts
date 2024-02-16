import Z, { ZeyoAs } from "zeyo";
import style from "./style.module.css"

export default function Snackbar(...child: Array<ZeyoAs<keyof HTMLElementTagNameMap> | string>) {
    return Z("div").class(style.snackbar).children(...child).object(o => {
        setTimeout(() => {
            o.element.remove()
        }, 3000);
    })
}