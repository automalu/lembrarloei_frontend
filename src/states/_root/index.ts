import { Childrens, StateBase, StateOptions } from "../../navigation/state"
import Params from "../estabelecimentos/params"

export default class Root extends Params(StateBase){
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
    constructor(childrens: Childrens) {
        super()
        this.childrens = childrens
    }
}