import State, { StateOptions } from "."
import Estabelecimentos from "./estabelecimentos"

export default class Estabelecimento extends State{
    previous = Estabelecimentos
    title = "Estabelecimentos"
    name = "estabelecimentos"
    options: StateOptions = [
        {
            title: "Pedidos",
            type: "route",
            route: "lanxis",
            param: {}
        },
        {
            title: "Inventário",
            type: "route",
            route: "/lanxis",
            param: {}
        },
        {
            title: "Aplicativo",
            type: "route",
            route: "/lanxis",
            param: {}
        }
    ]
    icons: StateOptions = []
    constructor(title: string){
        super()
        this.title = title
    }
}