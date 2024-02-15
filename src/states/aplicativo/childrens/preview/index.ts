import App from "../../../../app"
import { StateBase } from "../../../../navigation/state"
import ParametrosGenerico from "../../../propriedades/parametrosGenerico"
import Componente from "./componente"
import Childrens from "./chidren"

export default class Preview extends Componente(ParametrosGenerico(Childrens(StateBase))) {
    static path = "pv"
    previous = undefined
    title = "Preview"
    name = Preview.path
    app: App
    constructor(app: App) {
        super()
        this.app = app
    }

    async setup() {
        //talvez eu nao precise disso
    }
}