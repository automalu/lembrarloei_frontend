import Estabelecimento from "."
import { StateConstructor } from "../../navigation/state"
import EstabelecimentoParceiro from "./parceiro"

export default class OptionEstabelecimento {
    static tiposmap: {[key: string]: StateConstructor} = {
        "estabelecimento": Estabelecimento,
        "parceiroondeir": EstabelecimentoParceiro
    }
    title: string
    param: string[]
    next: StateConstructor = Estabelecimento
    constructor(estabelecimento: {nome: string, id: string, tipo: string}) {
        this.title = estabelecimento.nome
        this.param = [estabelecimento.id]
        if(Object.prototype.hasOwnProperty.call(OptionEstabelecimento.tiposmap, estabelecimento.tipo))
        this.next = OptionEstabelecimento.tiposmap[estabelecimento.tipo]
    }
}