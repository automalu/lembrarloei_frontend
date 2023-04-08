import State, { StateOptions } from "."
import Estabelecimento from "./estabelecimento"

export default class Estabelecimentos extends State {
    static path = "es"
    title = "Estabelecimentos"
    name = "estabelecimentos"
    icons: StateOptions = []
    previous = undefined
    constructor() {
        super()
        this.options[Estabelecimento.path] = {
            title: "Lanxis",
            type: "route",
            route: "e",
            param: { id: "lanxis" }
        }
    }

    setParametros(route: string[]): string[] {
        return route
    }
}