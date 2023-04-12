import Z, { Zeyo } from "zeyo";
import Component from "../..";
import style from "../layout.module.css"
import Nav from "../../../navigation";
export default class Navigation extends Component {
    main: Zeyo = Z("nav");
    create(navigation: Nav): Zeyo {
        return this.main = Z("div").class(style.navigation).children(
            Z("h2").text(navigation.state.title),
            Z("nav").children(
                ...(() => {
                    const zs: Zeyo[] = []
                    for (const key in navigation.state.childrens) {
                        zs.push(Z("a").set("href", "path1").text(navigation.state.childrens[key].title).click((e) => {
                            e.preventDefault()
                            navigation.next(navigation.state.childrens[key])
                            /* if (navigation.state.childrens[key].type === "state") navigation.state.next(navigation.state.childrens[key])
                            else navigation.state.route(navigation.state.childrens[key]) */
                        }))
                    }
                    return zs
                })(),
            ),
            Z("button").set("type", "button").text("Voltar").click(() => navigation.back())
        )
    }
}