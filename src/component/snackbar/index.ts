import Z, { ZeyoAs } from "zeyo";
import App from "../../app";
import style from "./style.module.css"

export default function Snackbar(app: App, ...child: Array<ZeyoAs<keyof HTMLElementTagNameMap> | string>) {
    app.root.appendChild(Z("div").class(style.snackbar).children(...child).object(o => {
        setTimeout(() => {
            o.element.remove()
        }, 3000);
    }).element)
}