import App from "../../app"
import { StateBase, StateOptions } from "../../navigation/state"
import Estabelecimento from "../estabelecimento"
import OptionEstabelecimento from "../estabelecimento/options"
import ParametrosGenerico from "../propriedades/parametrosGenerico"
import Childrens from "./childrens"
import Componente from "./componente"

export default class Estabelecimentos extends Componente(ParametrosGenerico(Childrens(StateBase))) {
    static path = "es"
    title = "Estabelecimentos"
    name = Estabelecimentos.path
    icons: StateOptions = []
    previous = undefined

    app: App
    constructor(app: App) {
        super()
        this.app = app
    }

    async setup() {
        const [result, err] = await this.app.repository.findOne("UsuarioEstabelecimentos", {
            username: ""
        })
        console.log(result, err)
        if(err || !result) return 
        result.estabelecimentos.forEach((e: any) => {
            this.options[e.estabelecimento.id] = new OptionEstabelecimento(e.estabelecimento)
            /* {
                title: e.estabelecimento.nome,
                next: Estabelecimento,
                param: [e.estabelecimento.id]
            } */
        });
        //aqui tem que pegar o elementos da lista de opcoes
    }
}