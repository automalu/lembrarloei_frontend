import { Childrens, StateBaseConstructor } from "../../navigation/state";
import Estabelecimento from "../estabelecimento";
import Inventario from "../inventario";

export default function Childrens<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        childrens: Childrens = {
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
                next: Estabelecimento,
                param: []
            }
        }

        options: Childrens = {}
    }
}