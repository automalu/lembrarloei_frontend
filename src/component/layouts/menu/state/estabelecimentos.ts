import State, { StateOptions } from "."
import User from "./user"

export default class Estabelecimentos extends State {
    previous = User
    title = "Estabelecimentos"
    name = "estabelecimentos"
    options: StateOptions = [
        {
            title: "Lanxis",
            type: "route",
            route: "e",
            param: { id: "lanxis" }
        }
    ]
    icons: StateOptions = []
}