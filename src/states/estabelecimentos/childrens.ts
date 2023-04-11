import { StateConstructor } from "../../navigation/state";
import Estabelecimento from "../estabelecimento";
import Estabelecimentos from "../estabelecimentos";

export default function Childrens<Base extends StateConstructor>(base: Base) {
    return class extends base {
        childrens: { [key: string]: any; } = {
            [Estabelecimento.path]: {
                title: "Lanxis",
                type: "route",
                route: "e",
                next: Estabelecimento,
                param: { id: "lanxis" }
            }
        }
    }
}