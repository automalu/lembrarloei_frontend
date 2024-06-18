import Z, { Zeyo } from "zeyo";
import App from "../../app";
import { StateBaseConstructor } from "../../navigation/state";
import Chat from "./componentes/chat";
import Participante from "../../form/components/chat/participante";
import Home from "./componentes/home";
import LayoutColumnsToTabs from "../../component1.1/layout/columnsToTab";
export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    abstract class Teste extends base {
        statusMap: { [key: string]: Zeyo } = {}
        abstract participante: Participante
        constructor(...params: any[]) {
            super(params)
        }
        async setComponente(app: App) {
            return Z("div").class("state-component").children(
                new LayoutColumnsToTabs(app).setSlides((changeSlide => [
                    new Home(app, changeSlide),
                    new Chat(app, 
                        new Participante(app, app.session.client ? app.session.client._id : crypto.randomUUID(), true),
                        changeSlide
                    ).object(o => {
                        o.setChat({ _id: crypto.randomUUID() })
                    })
                ]))
            )
        }
    }
    return Teste
}

/* 
new ListaHorizontal(app, "Confirmando Dados").object(async (o) => {
                    app.repositoryMemory.createTriggerTo("Pedidos", async (update) => {
                        if (update.value.status !== "confirmando") return
                        const [pedido, err] = await app.repositoryMemory.findOne("Pedidos", { _id: update.id })
                        if (err) return
                        o.children(
                            new CardSimple(app, pedido.title, pedido.status).children(
                                new ListItensCarrinho(app, pedido)
                            ).object(o => {
                                const resumo = new ResumoDadosClientes(app)
                                o.children(resumo)
                                app.repositoryMemory.createTriggerTo("Pedidos", async (update) => {
                                    if (update.id === pedido._id && Object.keys(update.value)[0] === "status")
                                        return o.element.remove()
                                    if (Object.keys(update.value)[0] === "cliente") {
                                        const [cliente] = await app.repositoryMemory.findOne("Clientes", { _id: update.value.cliente });
                                        (resumo.childList[1] as ZeyoAs<"i">).text(`Cliente: ${cliente.nome}`)
                                    } else
                                        if (Object.keys(update.value)[0] === "entrega") {
                                            (resumo.childList[2] as ZeyoAs<"i">).text(update.value.entrega ? `Endereço: ` : "Retirar no Local")
                                        }
                                }, "update")
                            }).children(
                                Z("button").text("Preparar").click(() => {
                                    app.repositoryMemory.update("Pedidos", pedido._id, { status: "preparacao" })
                                })
                            )
                        )
                    }, "update")
                }),
                new ListaHorizontal(app, "Preparação").object(async (o) => {
                    app.repositoryMemory.createTriggerTo("Pedidos", async (update) => {
                        if(update.value.status !== "confirmando") return
                        const [pedido, err] = await app.repositoryMemory.findOne("Pedidos", {_id: update.id})
                        if(err) return
                        o.children(
                            new CardSimple(app, pedido.title, pedido.status).object(o => {
                                app.repositoryMemory.createTriggerTo("Pedidos", (update) => {
                                    if(update.id === pedido._id)
                                        o.element.remove()
                                }, "update")
                            }).children(
                                new ListItensCarrinho(app, pedido.carrinho)
                            )
                        )
                    }, "update")
                }), */