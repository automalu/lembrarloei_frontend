import Z, { Zeyo } from "zeyo";
import Component from "../..";
import State from "./state";
import style from "../layout.module.css"

export default class Navigation extends Component {
    main: Zeyo = Z("nav");
    create(state: State): Zeyo {
        return this.main = Z("div").class(style.navigation).children(
            Z("h2").text(state.title),
            Z("nav").children(
                ...(() => {
                    const zs: Zeyo[] = []
                    for (const key in state.options) {
                        zs.push(Z("a").set("href", "path1").text(state.options[key].title).click((e) => {
                            e.preventDefault()
                            if (state.options[key].type === "state") state.next(state.options[key])
                            else state.route(state.options[key])
                        }))
                    }
                    return zs
                })(),
            ),
           /*  Z("button").set("type", "button").text("Voltar").click(() => state.back()) */
        )
    }
}