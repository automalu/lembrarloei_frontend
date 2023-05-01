import { Childrens, Options, StateBase, StateOptions } from "../../navigation/state"
import ComponenteGenerico from "../propriedades/componente"
import ParametrosGenerico from "../propriedades/parametrosGenerico"

export default class Root extends ComponenteGenerico(ParametrosGenerico(StateBase)){
    childrens: Childrens
    options: Options = {}
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

    async setup() {
        
    }
}