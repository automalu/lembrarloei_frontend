import { StateBaseConstructor } from "../../navigation/state";

export default function Params<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        parametros: object = {}
        setParametros(route: string[]) {
            return route
        }
    }
}