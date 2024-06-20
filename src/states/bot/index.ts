import App from "../../app"
import { StateBase } from "../../navigation/state"
import ParametrosGenerico from "../propriedades/parametrosGenerico"
import Componente from "./componente"
import Childrens from "./childrens"

export default class Bot extends Componente(ParametrosGenerico(Childrens(StateBase))) {
    static path = "b"
    previous = undefined
    title = "Bot"
    name = Bot.path
    app: App
    constructor(app: App) {
        super()
        this.app = app
    }

    async setup() {
        //talvez eu nao precise disso
    }
}