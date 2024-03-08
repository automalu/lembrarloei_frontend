import Z, { ZeyoAs } from "zeyo";
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
                    Z("div").class(dashboard["dashboard"]).object(async o => {
                        const grafico = new Grafico(app);
                        const acesso = new Acesso(app)
                        async function setByDate(o: ZeyoAs<"input">) {
                            const date = new Date()
                            const [year, month, day] = o.element.value.split("-").map(s => Number(s));
                            date.setFullYear(year, month - 1, day);
                            date.setHours(0, 0, 0, 0);
                            const [result, err] = await app.repository.findMany("Registros", { hostname, date: { "$gt": date.toISOString(), "$lt": date.setDate(date.getDate() + 1) } });
                            grafico.setData(result)
                            acesso.setData(result)
                        }
                        o.children(
                            //seria interessante a view do componente se inscrever no componente dai quando ele alterar então alteraria 
                            Title("Aplicativo").class(dashboard["full"]),
                            Z("input").set("type", "date").class(dashboard["full"]).on("input", setByDate).object(o => {
                                o.element.value = new Date().toISOString().substring(0, 10);
                                setByDate(o)
                            }),
                            acesso.element.class(dashboard.half),
                            grafico.element.class(dashboard.full),
                            /* Card(
                                Z("h3").text("Itens mais acessados"),
                                Z("p").text("2h 21min")
                            ).class(dashboard.full), */
                        )
                    }),
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