import { Zeyo } from "zeyo";
import App from "../../../app";
import ListaHorizontal from "../../../component1.1/listaHorizontal";

export default class Etapa extends ListaHorizontal {
    statusList: string[]
    constructor(app: App, title: string, statusList: string[]) {
        super(app, title)
        console.log(title, statusList.length)
        this.statusList = statusList
    }
}