import { StateConstructor } from "../../navigation/state";
import Estabelecimento from "../estabelecimento";
import Estabelecimentos from "../estabelecimentos";

export default function Childrens<Base extends StateConstructor>(base: Base) {
    return class extends base {
        childrens: { [key: string]: any; } = {
            "p": {
                title: "Pedidos",
                type: "route",
                route: "p",
                param: {}
            },
            "i": {
                title: "Inventário",
                type: "route",
                route: "i",
                param: {}
            },
            "a": {
                title: "Aplicativo",
                type: "route",
                route: "a",
                param: {}
            }
        }
    }
}