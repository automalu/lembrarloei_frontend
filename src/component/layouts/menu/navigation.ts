import Z, { Zeyo } from "zeyo";
import Component from "../..";
import {State} from "../../../navigation";
import style from "../layout.module.css"
import Nav from "../../../navigation";
export default class Navigation extends Component {
    main: Zeyo = Z("nav");
    create(state: State): Zeyo {
        console.log("entrou no create", Object.keys(state.childrens))
        for (const key in state) console.log(key)
        return this.main = Z("div").class(style.navigation).children(
            Z("h2").text(state.title),
            Z("nav").children(
                ...(() => {
                    const zs: Zeyo[] = []
                    for (const key of Object.keys(state.childrens)) {
                        console.log(key)
                        zs.push(Z("a").set("href", "path1").text(state.childrens[key].title).click((e) => {
                            e.preventDefault()
                            /* if (navigation.state.childrens[key].type === "state") navigation.state.next(navigation.state.childrens[key])
                            else navigation.state.route(navigation.state.childrens[key]) */
                        }))
                    }
                    return zs
                })(),
            ),
            Z("button").set("type", "button").text("Voltar").click(() => {
                state.childrens["teste"] = "Teste"
                console.log(state)
                console.log("adicionou", state.childrens)
            })
        )
    }
}