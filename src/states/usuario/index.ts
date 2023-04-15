import { StateBase, StateOptions } from "../../navigation/state"
import Painel from "../../pages/painel"
import ParametrosGenerico from "../propriedades/parametrosGenerico"
import Childrens from "./childrens"

export default class Usuario extends ParametrosGenerico(Childrens(StateBase)){
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