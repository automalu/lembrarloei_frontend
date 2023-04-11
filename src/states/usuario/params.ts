import { StateConstructor } from "../../navigation/state";

export default function Params<Base extends StateConstructor>(base: Base) {
    return class extends base {
        parametros: { username: string } = { username: "" }
        setParametros(route: string[]) {
            const username = route.shift()
            this.parametros = {
                username: username ? username : ""
            }
            return route
        }
    }
}