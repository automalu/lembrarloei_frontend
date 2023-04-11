import { StateConstructor } from "../../navigation/state";

export default function Params<Base extends StateConstructor>(base: Base) {
    return class extends base {
        parametros: object = {}
        setParametros(route: string[]): string[] {
            this.parametros = {
                id: route.shift()
            }
            return route
        }
    }
}