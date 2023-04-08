import State, { StateOptions } from "."
import Estabelecimentos from "./estabelecimentos"

export default class Estabelecimento extends State{
    static path = "e"
    previous = undefined
    title = "Estabelecimento"
    name = "estabelecimento"
    parametros: object = {}
    options: StateOptions = [
        {
            title: "Pedidos",
            type: "route",
            route: "p",
            param: {}
        },
        {
            title: "Inventário",
            type: "route",
            route: "i",
            param: {}
        },
        {
            title: "Aplicativo",
            type: "route",
            route: "a",
            param: {}
        }
    ]
    icons: StateOptions = []
    constructor(){
        super()
    }

    setParametros(route: string[]): string[] {
        this.parametros = {
            id: route.shift()
        }
        return route
    }
}