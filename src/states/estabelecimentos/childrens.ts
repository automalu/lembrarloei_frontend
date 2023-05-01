import { Childrens, Options, StateBaseConstructor } from "../../navigation/state";
import Estabelecimento from "../estabelecimento";

export default function Childrens<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        childrens: Childrens = {
            [Estabelecimento.path]: Estabelecimento,
        }
        options: Options = {}
    }
}