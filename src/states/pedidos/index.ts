import App from "../../app"
import { StateBase } from "../../navigation/state"
import ParametrosGenerico from "../propriedades/parametrosGenerico"
import Childrens from "./childrens"
import Componente from "./componente"

export default class Pedidos extends Componente(ParametrosGenerico(Childrens(StateBase))) {
    static path = "p"
    previous = undefined
    title = "Inventário"
    name = Pedidos.path
    app: App
    constructor(app: App) {
        super()
        this.app = app
    }

    async setup() {
        //talvez eu nao precise disso
    }
}