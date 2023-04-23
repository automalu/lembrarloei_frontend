import App from "../../app"
import { StateBase, StateOptions } from "../../navigation/state"
import ParametrosGenerico from "../propriedades/parametrosGenerico"
import Childrens from "./childrens"
import Componente from "./componente"

export default class Estabelecimentos extends Componente(ParametrosGenerico(Childrens(StateBase))) {
    static path = "es"
    title = "Estabelecimentos"
    name = Estabelecimentos.path
    icons: StateOptions = []
    previous = undefined

    app: App
    constructor(app: App) {
        super()
        this.app = app
    }

    async setup() {
        //aqui tem que pegar o elementos da lista de opcoes
    }
}