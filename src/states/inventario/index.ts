import App from "../../app"
import { StateBase } from "../../navigation/state"
import ParametrosGenerico from "../propriedades/parametrosGenerico"
import Childrens from "./childrens"
import Componente from "./componente"

export default class Inventario extends Componente(ParametrosGenerico(Childrens(StateBase))) {
    static path = "i"
    previous = undefined
    title = "Inventário"
    name = Inventario.path
    app: App
    constructor(app: App) {
        super()
        this.app = app
        this.setup()
    }

    setup() {
        //talvez eu nao precise disso
    }
}