import App from "../../app"
import { StateBase, StateOptions } from "../../navigation/state"
import ComponenteGenerico from "../propriedades/componente"
import ParametrosGenerico from "../propriedades/parametrosGenerico"
import Childrens from "./childrens"

export default class Estabelecimentos extends ComponenteGenerico(ParametrosGenerico(Childrens(StateBase))) {
    static path = "es"
    title = "Estabelecimentos"
    name = Estabelecimentos.path
    icons: StateOptions = []
    previous = undefined

    app: App
    constructor(app: App) {
        super()
        this.app = app
        this.setup()
    }

    setup() {
        //aqui tem que pegar o elementos da lista de opcoes
    }
}