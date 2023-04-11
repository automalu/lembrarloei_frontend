import State, { StateOptions } from "."
import Estabelecimentos from "./estabelecimentos"

export default class User extends State{
    static path = "u"
    previous = undefined
    title = "Usuario"
    name = "user"
    parametros: object = {}
    options: {[key: string]: any} = {}
    icons: StateOptions = [{
        title: "Conta",
        type: "route",
        route: "/account",
        param: {}
    }]
    constructor() {
        super()
        this.options[Estabelecimentos.path] = {
            title: "Estabelecimentos",
            next: Estabelecimentos,
        }
        /* this.options[Conta.path] = {
            title: "Conta",
            next: Conta
        } */
    }
    setParametros(route: string[]) {
        this.parametros = {
            username: route.shift()
        }
        return route
    }
}