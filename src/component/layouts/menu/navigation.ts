import Z, { Zeyo } from "zeyo";
import Component from "../..";
import style from "../layout.module.css"
import Nav from "../../../navigation";
export default class Navigation extends Component {
    main: Zeyo = Z("nav");
    create(navigation: Nav): Zeyo {
        return this.main = Z("div").class(style.navigation).children(
            Z("h2").text(navigation.state.title),
            Z("a").class("d-flex", "ai-center", style.back).children(
                Z("i").HTML(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`),
                Z("b").text("Voltar")
            ).click(() => navigation.back()),
            Z("nav").children(
                ...(() => {
                    const zs: Zeyo[] = []
                    for (const key in navigation.state.options) {
                        zs.push(Z("a").set("href", "path1").text(navigation.state.options[key].title).clickevent((e) => {
                            e.preventDefault()
                            if (navigation.state.options)
                                navigation.next(navigation.state.options[key], this.app)
                            /* if (navigation.state.childrens[key].type === "state") navigation.state.next(navigation.state.childrens[key])
                            else navigation.state.route(navigation.state.childrens[key]) */
                        }))
                    }
                    return zs
                })(),
            )
        )
    }
}