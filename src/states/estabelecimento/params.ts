import { StateBaseConstructor } from "../../navigation/state";

export default function Params<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        parametros: { [key: string]: string } = {}
        setParametros(route: string[]): string[] {
            const [id] = [route.shift()]
            this.parametros = {
                "id": id ? id : ""
            }
            return route
        }
    }
}