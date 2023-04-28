import { Childrens, StateBaseConstructor } from "../../navigation/state";
import Estabelecimentos from "../estabelecimentos";

export default function Childrens<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        childrens: Childrens = {
            [Estabelecimentos.path]: {
                title: "Estabelecimentos",
                next: Estabelecimentos,
            }
        }
        options: Childrens = {}
    }
}