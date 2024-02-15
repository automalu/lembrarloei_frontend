import Z from "zeyo";
import App from "../../app";
import Card from "../../component/card";
import Acesso from "../../component/dashboard/acesso";
import Grafico from "../../component/dashboard/grafico/ultimodia";
import Title from "../../component/dashboard/title";
import { StateBaseConstructor } from "../../navigation/state";
import dashboard from "../../component/dashboard/dashboard.module.css"
export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App) {
            return Z("div").class("state-component", dashboard.painel).object(async o => {
                await this.waitsetup(app)
                const hostname = app.session.estabelecimento ? app.session.estabelecimento.hostname : ""
                o.children(
                    Z("div").class(dashboard["dashboard"]).children(
                        //seria interessante a view do componente se inscrever no componente dai quando ele alterar então alteraria 
                        Title("Aplicativo").class(dashboard["full"]),
                        new Acesso(app).create(hostname),
                        /* Card(
                            Z("h3").text("Tempo no aplicativo"),
                            Z("p").text("2h 21min")
                        ).class(dashboard.half), */
                        Card(
                            Z("h3").text("Itens mais acessados"),
                            Z("p").text("2h 21min")
                        ).class(dashboard.full),
                        new Grafico(app, hostname).element.class(dashboard.full),
                    ),
                    Z("div").class(dashboard["dashboard"]).children(
                        Title("Pedidos").class(dashboard["full"]),
                    ),
                    Z("div").class(dashboard["dashboard"]).children(
                        Title("Inventario").class(dashboard["full"]),
                    ),
                )
            })
        }

        waitsetup(app: App) {
            if (app.session.estabelecimento) return
            return new Promise((res) => {
                setTimeout(async () => {
                    await this.waitsetup(app)
                    res(true)
                }, 200)
            })
        }
    }
}