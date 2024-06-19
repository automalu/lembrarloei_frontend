import App from "../../../app";
import ListaHorizontal from "../../../component1.1/listaHorizontal";
import style from "./style.module.css"

export default class Etapa extends ListaHorizontal {
    statusList: string[]
    constructor(app: App, title: string, statusList: string[]) {
        super(app, title)
        console.log(title, statusList.length)
        this.statusList = statusList
        this.childList[1].class(style.reverse)
    }
}