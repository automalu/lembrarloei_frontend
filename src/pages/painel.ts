import Z, { Zeyo } from "zeyo";
import Page from ".";
import CardSimple from "../component/cardSimple";
import LayoutApp from "../component/layouts/app";
import ListaHorizontal from "../component/listaHorizontal";
import FormItem from "../features/ingrediente/forms/create";
import Modal from "../modal";
import layout from "../component/layouts/layout.module.css"
import Navigation from "../navigation";
import Root from "../states/_root";
import Menu from "../component/layouts/menu/menu";
import { Watcher } from "../component/watcher";
export default class Painel extends Page {
    route: string = "/painel" // TODO: no futuro posso criar subpaginas que serao chamadas a partir dessa "/painel/#"
    title?: string | undefined;
    children?: Node[] | undefined;
    auth?: string | undefined;
    params?: { [key: string]: string; } | undefined;
    main: Zeyo = Z("div");
    async create(): Promise<Zeyo> {
        const arr = "u/evandro/es/e/lanxis".split("/");
        const navigation = new Proxy(new Navigation(new Root()), new Watcher(null, "", []));
        navigation.read(arr)
        const layoutapp = new LayoutApp(this.app, new Menu(this.app, navigation))
        console.log(navigation)
        return this.main = layoutapp.inner(
            Z("section").class("d-grid", "gap-g", layout.content).children(
                Z("header").class("p-10").children(Z("h1").text(navigation.state.title)),
                Z("div").class(layout.dash).children()
            )
        )
    }
}
