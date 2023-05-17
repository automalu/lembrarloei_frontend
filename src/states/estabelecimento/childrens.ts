import { Childrens, Options, StateBaseConstructor } from "../../navigation/state";
import Aplicativo from "../aplicativo";
import Estabelecimento from "../estabelecimento";
import Inventario from "../inventario";

export default function Childrens<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        childrens: Childrens = {
            "p": Estabelecimento,
            "i": Inventario,
            "a": Aplicativo
        }

        options: Options = {
            "p": {
                title: "Pedidos",
                next: Estabelecimento,
                param: []
            },
            "i": {
                title: "Inventário",
                next: Inventario,
                param: []
            },
            "a": {
                title: "Aplicativo",
                next: Aplicativo,
                param: []
            }
        }
    }
}