import { StateBase, StateOptions } from "../../navigation/state"
import Painel from "../../pages/painel"
import Childrens from "./childrens"
import Params from "./params"

export default class Usuario extends Params(Childrens(StateBase)){
    static path = "u"
    previous = undefined
    title = "Usuario"
    name = Usuario.path
    icons: StateOptions = [{
        title: "Conta",
        type: "route",
        route: "/account",
        param: {}
    }]
    page = Painel
}