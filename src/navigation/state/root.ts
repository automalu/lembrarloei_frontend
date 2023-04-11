import State, { StateOptions } from "."
import Estabelecimentos from "./estabelecimentos"
import User from "./user"

export default class Root extends State{
    static path = ""
    previous = undefined
    title = "Root"
    name = "root"
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
        this.options[User.path] = {
            title: "User",
            next: User,
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