import Z from "zeyo";
import App from "../../app";
import Adapter from "../../component/adapter";
import Snackbar from "../../component/snackbar";
import FormSelectTipoComponente from "../../features/componente/forms/select";
import FormUpdateListaHorizontal from "../../features/componente/listahorizontal/forms/update";
import Modal from "../../modal";
import { StateBaseConstructor } from "../../navigation/state";
import ListaHorizontal from "../../component1.1/listaHorizontal";
import CardSimple from "../../component1.1/cardSimple";
import FormUpdateHeader from "../../features/componente/forms/updateHeader";

export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App) {
            /* const [itens, horizontal] = new ListaHorizontal(app, CardSimple).watch({
                adapter: new Adapter("empty"),
                title: "Componentes",
                list: ([] as any[])
            });
            (async () => {
                
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
            ) */
            return Z("div").class("flex-state-component").children(
                Z("button").text("Gerar Aplicativo").click(async () => {
                    const event = "usecase/generateappfile"
                    app.socket.emit(event, app.session.estabelecimento)
                    const [result, err] = await app.socket.wait(event)
                    console.log(result)
                    Snackbar(app,
                        Z("h3").text("Aplicativo Gerado com Sucesso 😀")
                    )
                }),
                new ListaHorizontal(app, "Componentes").pushHeader(
                    Z("button").text("Criar").click(() => Modal.show(app, new FormSelectTipoComponente(app, [])))
                ).object(async (o) => {
                    const [result, err] = await app.repository.findMany("Componentes", { estabelecimento: app.session.estabelecimento._id })
                    if (err) return console.error(result);
                    result.forEach(r => {
                        o.push(new CardSimple(app, r.titulo, r.tipo).click(() =>
                            Modal.show(app, new FormUpdateHeader(app, r, []))
                        ))
                    })
                })
            )
        }
    }
}