import App from "../../app"
import { StateBase } from "../../navigation/state"
import Parceiros from "../parceiros"
import Childrens from "./childrens"
import Componente from "./componente"
import Lista from "./lista"
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
        this.app.socket.emit("enterestabelecimento", { estabelecimento: this.parametros.id })
        const [result, err] = await this.app.socket.wait("enterestabelecimento")
        if(err) return console.error(result)
        if(result.tipo !== "estabelecimento" && Object.prototype.hasOwnProperty.call(Lista.tipos, result.tipo)){
            const estabelecimento = new Lista.tipos[result.tipo](this.app)
            this.childrens = estabelecimento.childrens
            this.options = estabelecimento.options
        }
        this.title = result.nome
        this.app.session.estabelecimento = result
        //TODO: aqui tenho que botar um algo tipo token do usuario para quando conectar ele ficar refazer essa funcao
    }
}