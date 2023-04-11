import { StateBase, StateOptions } from "../../navigation/state"
import Params from "../estabelecimentos/params"
import Childrens from "./childrens"

export default class Root extends Params(Childrens(StateBase)){
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
}