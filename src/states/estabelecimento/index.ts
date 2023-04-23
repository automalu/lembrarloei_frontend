import App from "../../app"
import { StateBase } from "../../navigation/state"
import Childrens from "./childrens"
import Componente from "./componente"
import Params from "./params"

export default class Estabelecimento extends Componente(Params(Childrens(StateBase))) {
    static path = "e"
    previous = undefined
    title = "Estabelecimento"
    name = Estabelecimento.path
    app: App
    constructor(app: App) {
        super()
        this.app = app
    }

    async setup() {
        //talvez eu nao precise disso
    }
}