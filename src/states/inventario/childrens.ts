import { Childrens, Options, StateBaseConstructor } from "../../navigation/state";
import Estabelecimento from "../estabelecimento";
import Estabelecimentos from "../estabelecimentos";

export default function Childrens<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        childrens: Childrens = {
            "p": Estabelecimento,
            "i": Estabelecimento,
        }
        options: Options = {
            "p": {
                title: "Alguma",
                next: Estabelecimento,
                param: []
            },
            "i": {
                title: "Coisa",
                next: Estabelecimento,
                param: []
            },
            "a": {
                title: "Aplicativo",
                next: Estabelecimento,
                param: []
            }
        }
    }
}