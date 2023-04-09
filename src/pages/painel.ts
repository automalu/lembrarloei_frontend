import Z, { Zeyo } from "zeyo";
import Page from ".";
import CardSimple from "../component/cardSimple";
import LayoutApp from "../component/layouts/app";
import ListaHorizontal from "../component/listaHorizontal";
import FormItem from "../features/ingrediente/forms/create";
import Modal from "../modal";
import layout from "../component/layouts/layout.module.css"
import Estabelecimento from "../component/layouts/menu/state/estabelecimento";
import User from "../component/layouts/menu/state/user";
import Store from "../component/layouts/menu/state/store";
import Root from "../component/layouts/menu/state/root";
export default class Painel extends Page {
    route: string = "/painel" // TODO: no futuro posso criar subpaginas que serao chamadas a partir dessa "/painel/#"
    title?: string | undefined;
    children?: Node[] | undefined;
    auth?: string | undefined;
    params?: { [key: string]: string; } | undefined;
    main: Zeyo = Z("div");
    async create(obj?: any): Promise<Zeyo> {
        const [itens, horizontal] = new ListaHorizontal(this.app, CardSimple).watch({
            adapter: "item",
            title: "Itens",
            list: ([] as { title: string, description: string }[])
        })
        itens.list.push({ title: "Teste0", description: "Testando lista" })
        itens.list.push({ title: "Teste1", description: "Testando lista" })
        itens.list.push({ title: "Teste2", description: "Testando lista" })
        const layoutapp = new LayoutApp(this.app)
        const arr = "u/evandro/es/e/lanxis".split("/");
        const store = new Store(new Root());
        (function read(path: string[]) {
            if(!path.length) return
            const key = path.shift()
            if(!key || !Object.prototype.hasOwnProperty.call(store.state.options, key)) 
            return console.error(key, "não existe em:", store.state.name)
            
            const aux = store.state
            console.log(store)
            store.state = new store.state.options[key].next()
            store.state.previous = aux
            read(store.state.setParametros(path))
        })(arr)
        console.log(store)
        return this.main = layoutapp.inner(
            Z("section").class("d-grid", "gap-g", layout.content).children(
                Z("header").class("p-10").children(Z("h1").text(layoutapp.menu.state.title)),
                Z("div").class(layout.dash).children(
                    Z("button").text("Add").click(() =>
                        Modal.show(this.app, new FormItem(this.app, { title: "", description: "" }, itens))
                    ),
                    await horizontal.create(itens)
                )
            )
        )
    }
}
