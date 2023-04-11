import { StateConstructor } from "../../navigation/state";
import Estabelecimentos from "../estabelecimentos";

export default function Childrens<Base extends StateConstructor>(base: Base) {
    return class extends base {
        childrens: { [key: string]: any; } = {
            [Estabelecimentos.path]: {
                title: "Estabelecimentos",
                next: Estabelecimentos,
            }
        }
    }
}