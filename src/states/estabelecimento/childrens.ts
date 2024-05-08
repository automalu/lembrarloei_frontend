import { Childrens, Options, StateBaseConstructor } from "../../navigation/state";
import Aplicativo from "../aplicativo";
import Estabelecimento from "../estabelecimento";
import Inventario from "../inventario";
import Pedidos from "../pedidos";

export default function Childrens<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        childrens: Childrens = {
            "p": Pedidos,
            "i": Inventario,
            "a": Aplicativo
        }

        options: Options = {
            "p": {
                title: "Pedidos",
                next: Pedidos,
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