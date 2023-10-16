import { Childrens, Options, StateBaseConstructor } from "../../../navigation/state";
import Aplicativo from "../../aplicativo";
import Parceiros from "../../parceiros";
import Inventario from "../../inventario";

export default function Childrens<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        childrens: Childrens = {
            "p": Parceiros,
            "i": Inventario,
            "a": Aplicativo
        }

        options: Options = {
            "p": {
                title: "Parceiros",
                next: Parceiros,
                param: []
            },
            "i": {
                title: "Clientes",
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