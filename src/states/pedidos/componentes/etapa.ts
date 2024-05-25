import { Zeyo } from "zeyo";
import App from "../../../app";
import ListaHorizontal from "../../../component1.1/listaHorizontal";

export default class Etapa extends ListaHorizontal {
    constructor(app: App, title: string, statusList: string[], statuMapComponent: {[key: string]: Zeyo}) {
        super(app, title)
        statusList.forEach(s => statuMapComponent[s] = this)
    }
}