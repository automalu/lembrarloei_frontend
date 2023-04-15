import { StateBase, StateOptions } from "../../navigation/state"
import ParametrosGenerico from "../propriedades/parametrosGenerico"
import Childrens from "./childrens"

export default class Estabelecimentos extends ParametrosGenerico(Childrens(StateBase)) {
    static path = "es"
    title = "Estabelecimentos"
    name = Estabelecimentos.path
    icons: StateOptions = []
    previous = undefined
}