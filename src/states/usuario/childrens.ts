import { Childrens, Options, StateBaseConstructor } from "../../navigation/state";
import Estabelecimento from "../estabelecimento";
import Estabelecimentos from "../estabelecimentos";

export default function Childrens<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        childrens: Childrens = {
            [Estabelecimentos.path]: Estabelecimentos,
            [Estabelecimento.path]: Estabelecimento,
        }
        options: Options = {
            [Estabelecimentos.path]: {
                title: "Estabelecimentos",
                next: Estabelecimentos,
            }
        }
    }
}