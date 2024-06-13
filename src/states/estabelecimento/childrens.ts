import { Childrens, Options, StateBaseConstructor } from "../../navigation/state";
import Aplicativo from "../aplicativo";
import Chats from "../chats";
import Inventario from "../inventario";
import Pedidos from "../pedidos";

export default function Childrens<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        childrens: Childrens = {
            "c": Chats,
            "p": Pedidos,
            "i": Inventario,
            "a": Aplicativo
        }

        options: Options = {
            "c": {
                title: "Chats",
                next: Chats,
                param: []
            },
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