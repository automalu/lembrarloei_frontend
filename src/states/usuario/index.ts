import App from "../../app"
import Token from "../../features/token"
import { StateBase, StateOptions } from "../../navigation/state"
import Painel from "../../pages/painel"
import ComponenteGenerico from "../propriedades/componente"
import ParametrosGenerico from "../propriedades/parametrosGenerico"
import Childrens from "./childrens"

export default class Usuario extends ComponenteGenerico(ParametrosGenerico(Childrens(StateBase))){
    static path = "u"
    previous = undefined
    title = "Usuario"
    name = Usuario.path
    icons: StateOptions = [{
        title: "Conta",
        type: "route",
        route: "/account",
        param: {}
    }]
    page = Painel

    app: App
    constructor(app: App) {
        super()
        this.app = app
    }

    async setup() {
        //SETToken
        await Token.set(this.app)
        /* const [result, err] = await this.app.repository.findOne("Usuarios", {username: ""})
        console.log(result, err)
        this.title = result.name */
    }
}