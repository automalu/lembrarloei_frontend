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
                ...state.options.map((o) => {
                    return Z("a").set("href", "path1").text(o.title).click((e) => {
                        e.preventDefault()
                        if(o.type === "state") state.next(o)
                        else state.route(o)
                    })
                }),
            ),
            Z("button").set("type", "button").text("Voltar").click(() => state.back())
        )
    }
}