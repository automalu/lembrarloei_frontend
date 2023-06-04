import { Childrens, Options, StateBaseConstructor } from "../../../navigation/state";
import Estabelecimento from "../../estabelecimento";
import Preview from "./preview";

export default function Childrens<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        childrens: Childrens = {
            "pv": Preview,
            "i": Estabelecimento,
        }
        options: Options = {
            "pv": {
                title: "Preview",
                next: Preview,
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