import Z, { Zeyo } from "zeyo";
import Page from ".";
import CardSimple from "../component/cardSimple";
import LayoutApp from "../component/layouts/app";
import ListaHorizontal from "../component/listaHorizontal";
import FormItem from "../features/ingrediente/forms/create";
import Modal from "../modal";
import layout from "../component/layouts/layout.module.css"
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
        return LayoutApp.inner(
            Z("section").class("d-grid", "gap-g", layout.content).children(
                Z("header").class("p-10").children(Z("h1").text("Inicio de tudo")),
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
