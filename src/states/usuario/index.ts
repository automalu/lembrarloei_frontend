import { StateBase, StateOptions } from "../../navigation/state"
import Childrens from "./childrens"
import Params from "./params"

export default class Usuario extends Params(Childrens(StateBase)){
    static path = "u"
    previous = undefined
    title = "Usuario"
    name = "user"
    icons: StateOptions = [{
        title: "Conta",
        type: "route",
        route: "/account",
        param: {}
    }]
    
}