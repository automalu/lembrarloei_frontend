import { StateBase, StateOptions } from "../../navigation/state"
import Childrens from "./childrens"
import Params from "./params"

export default class Estabelecimentos extends Params(Childrens(StateBase)) {
    static path = "es"
    title = "Estabelecimentos"
    name = "estabelecimentos"
    icons: StateOptions = []
    previous = undefined
}