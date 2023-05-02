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
        console.log(this.parametros)
        this.app.socket.emit("enterestabelecimento", { estabelecimento: this.parametros.id })
        const [result, err] = await this.app.socket.wait("enterestabelecimento")
        //TODO: aqui tenho que botar um algo tipo token do usuario para quando conectar ele ficar refazer essa funcao
        console.log(result, err)
    }
}