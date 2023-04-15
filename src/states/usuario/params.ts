import { StateBaseConstructor } from "../../navigation/state";

export default function Params<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        parametros: { username: string } = { username: "" }
        setParametros(route: string[]) {
            return route
            /* const username = route.shift()
            this.parametros = {
                username: username ? username : ""
            } */
        }
    }
}