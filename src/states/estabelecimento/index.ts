import { StateBase } from "../../navigation/state"
import Childrens from "./childrens"
import Params from "./params"

export default class Estabelecimento extends Params(Childrens(StateBase)) {
    static path = "e"
    previous = undefined
    title = "Estabelecimento"
    name = "estabelecimento"
}