import { StateConstructor } from "../../navigation/state";
import Usuario from "../usuario";

export default function Childrens<Base extends StateConstructor>(base: Base) {
    return class extends base {
        childrens: { [key: string]: any; } = {
            [Usuario.path]: {
                title: "User",
                next: Usuario,
            }
        }
    }
}