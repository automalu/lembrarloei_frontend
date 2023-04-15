import { Childrens, StateBase, StateOptions } from "../../navigation/state"
import ParametrosGenerico from "../propriedades/parametrosGenerico"

export default class Root extends ParametrosGenerico(StateBase){
    childrens: Childrens
    static path = ""
    previous = undefined
    title = "Root"
    name = "root"
    icons: StateOptions = [{
        title: "Conta",
        type: "route",
        route: "/account",
        param: {}
    }]
    page?: any
    constructor(childrens: Childrens, page?: any) {
        super()
        this.childrens = childrens
        this.page = page
    }
}