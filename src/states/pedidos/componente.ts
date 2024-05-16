import Z, { ZeyoAs } from "zeyo";
import App from "../../app";
import CardSimple from "../../component1.1/cardSimple";
import ListaHorizontal from "../../component1.1/listaHorizontal";
import ListItensCarrinho from "../../component1.1/listItensCarrinho";
import ResumoDadosClientes from "../../component1.1/resumoDadosClientes";
import FormChat from "../../features/chat/form/update";
import FormSelectTipoItem from "../../features/ingrediente/forms/select";
import Modal from "../../modal";
import { StateBaseConstructor } from "../../navigation/state";
export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App) {
            return Z("div").class("state-component").children(
                Z("button").text("Criar").click(() =>
                    Modal.show(app, new FormSelectTipoItem(app, { title: "", description: "" }, []))
                ),
                new ListaHorizontal(app, "Abertos").object(async (o) => {
                    app.repositoryMemory.createTriggerTo("Pedidos", (value) => {
                        o.children(
                            new CardSimple(app, value.title, value.status).object(o => {
                                app.repositoryMemory.createTriggerTo("Pedidos", (pedido) => {
                                    if(pedido.id === value._id)
                                        o.element.remove()
                                }, "update")
                            }).children(
                                new ListItensCarrinho(app, value.carrinho)
                            )
                        )
                    }, "create")
                }),
                new ListaHorizontal(app, "Confirmando Dados").object(async (o) => {
                    app.repositoryMemory.createTriggerTo("Pedidos", async (update) => {
                        if(update.value.status !== "confirmando") return
                        const [pedido, err] = await app.repositoryMemory.findOne("Pedidos", {_id: update.id})
                        if(err) return
                        o.children(
                            new CardSimple(app, pedido.title, pedido.status).children(
                                new ListItensCarrinho(app, pedido.carrinho)
                            ).object(o => {
                                const resumo = new ResumoDadosClientes(app)
                                o.children(resumo)
                                app.repositoryMemory.createTriggerTo("Pedidos", async (update) => {
                                    if(update.id === pedido._id && Object.keys(update.value)[0] === "status")
                                        return o.element.remove()
                                    if(Object.keys(update.value)[0] === "cliente"){
                                        const [cliente] = await app.repositoryMemory.findOne("Clientes", {_id: update.value.cliente});
                                        (resumo.childList[1] as ZeyoAs<"i">).text(`Cliente: ${cliente.nome}`)
                                    }else
                                    if(Object.keys(update.value)[0] === "entrega"){
                                        (resumo.childList[2] as ZeyoAs<"i">).text(update.value.entrega ? `Endereço: ` : "Retirar no Local")
                                    }
                                }, "update")
                            }).children(
                                Z("button").text("Preparar").click(() => {
                                    app.repositoryMemory.update("Pedidos", pedido._id, {status: "preparacao"})
                                })
                            )
                        )
                    }, "update")
                }),
                new ListaHorizontal(app, "Preparação").object(async (o) => {
                    /* app.repositoryMemory.createTriggerTo("Pedidos", async (update) => {
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
                    }, "update") */
                }),
            )
        }
    }
}