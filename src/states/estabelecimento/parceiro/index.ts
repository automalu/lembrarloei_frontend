import App from "../../../app"
import { StateBase } from "../../../navigation/state"
import Parceiros from "../../parceiros"
import Childrens from "./childrens"
import Componente from "../componente"
import Params from "../params"

export default class EstabelecimentoParceiro extends Componente(Params(Childrens(StateBase))) {
    static path = "e"
    previous = undefined
    title = "Estabelecimento"
    name = EstabelecimentoParceiro.path
    app: App
    constructor(app: App) {
        super()
        this.app = app
    }

    async setup() {
        console.log(this.parametros)
        this.app.socket.emit("enterestabelecimento", { estabelecimento: this.parametros.id })
        const [result, err] = await this.app.socket.wait("enterestabelecimento")
        if(err) console.error(result)
        if(result.id === "passofundoondeir"){
            this.childrens.p = Parceiros
            this.options.p.title = "Parceiros"
            this.options.p.next = Parceiros
        }
        this.title = result.nome
        this.app.session.estabelecimento = result
        //TODO: aqui tenho que botar um algo tipo token do usuario para quando conectar ele ficar refazer essa funcao
        console.log(result, err)
    }
}