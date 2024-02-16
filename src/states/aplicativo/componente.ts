import Z from "zeyo";
import App from "../../app";
import Adapter from "../../component/adapter";
import CardSimple from "../../component/cardSimple";
import ListaHorizontal from "../../component/listaHorizontal";
import Snackbar from "../../component/snackbar";
import FormSelectTipoComponente from "../../features/componente/forms/select";
import FormUpdateListaHorizontal from "../../features/componente/listahorizontal/forms/update";
import Modal from "../../modal";
import { StateBaseConstructor } from "../../navigation/state";

export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App) {
            const [itens, horizontal] = new ListaHorizontal(app, CardSimple).watch({
                adapter: new Adapter("empty"),
                title: "Componentes",
                list: ([] as any[])
            });
            (async () => {
                const [result, err] = await app.repository.findMany("Componentes", { estabelecimento: app.session.estabelecimento._id })
                if (err) return console.error(result);
                itens.list.push(...result)
            })();
            itens.adapter = new Adapter("full",
                (obj) => {
                    if (obj.tipo === "listahorizontal")
                        Modal.show(app, new FormUpdateListaHorizontal(app, obj))
                    //else Modal.show(app, new FormUpdateItem(app, obj, itens.list))
                },
                [
                    { component: "title", object: "titulo" },
                    { component: "description", object: "tipo" }
                ]
            )
            return Z("div").class("state-component").children(
                Z("button").text("Gerar Aplicativo").click(async () => {
                    const event = "usecase/generateappfile"
                    app.socket.emit(event, app.session.estabelecimento)
                    const [result, err] = await app.socket.wait(event)
                    console.log(result)
                    app.root.appendChild(Snackbar(
                        Z("h3").text("Aplicativo Gerado com Sucesso 😀")
                    ).element)
                }),
                Z("button").text("Criar").click(() =>
                    Modal.show(app, new FormSelectTipoComponente(app, itens))
                ),
                await horizontal.create(itens),
            )
        }
    }
}