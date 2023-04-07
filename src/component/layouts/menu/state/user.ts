import State, { StateOptions } from "."
import Estabelecimentos from "./estabelecimentos"

export default class User extends State{
    previous = undefined
    title = "Usuario"
    name = "user"
    options: StateOptions = [
        {
            title: "Estabelecimentos",
            type: "state",
            next: Estabelecimentos,
        },
        {
            title: "Conta",
            type: "route",
            route: "/account",
            param: {}
        }
    ]
    icons: StateOptions = [{
        title: "Conta",
        type: "route",
        route: "/account",
        param: {}
    }]
}