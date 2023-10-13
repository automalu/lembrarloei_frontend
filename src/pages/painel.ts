import Z, { Zeyo } from "zeyo";
import Page from ".";
import LayoutApp from "../component/layouts/app";
import layout from "../component/layouts/layout.module.css";
import Menu from "../component/layouts/menu/menu";
import StateTitle from "../component/title";
import StateComponent from "../component/stateComponent";
export default class Painel extends Page {
    route: string = "/painel" // TODO: no futuro posso criar subpaginas que serao chamadas a partir dessa "/painel/#"
    title?: string | undefined;
    children?: Node[] | undefined;
    auth?: string | undefined;
    params?: { [key: string]: string; } | undefined;
    main: Zeyo = Z("div");
    async create(): Promise<Zeyo> {
        const layoutapp = new LayoutApp(this.app, new Menu(this.app))
        return this.main = layoutapp.inner(
            Z("section").class("d-grid", "gap-g", layout.content).children(
                Z("header").class("p-10").children(
                    new StateTitle(this.app).watchSet(this.app.navigation).create(this.app.navigation)
                ).click(() => layoutapp.hide()),
                Z("div").class(layout.dash).children(
                    await new StateComponent(this.app).watchSet(this.app.navigation).create(this.app.navigation)
                )
            )
        )
    }
}
