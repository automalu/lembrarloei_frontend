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
            return Z("div").class("state-component", dashboard.painel).children(
                Z("div").class(dashboard["dashboard"]).children(
                    Title("Aplicativo").class(dashboard["full"]),//seria interessante a view do componente se inscrever no componente dai quando ele alterar então alteraria 
                    new Acesso(app).create("alasmenu.com"),
                    new Acesso(app).create("festivaldedelivery.alas.menu"),
                    Card(
                        Z("h3").text("Tempo no aplicativo"),
                        Z("p").text("2h 21min")
                    ).class(dashboard.half),
                    new Grafico(app, "festivaldedelivery.alas.menu").element.class(dashboard.full),
                    new Grafico(app, "alasmenu.com").element.class(dashboard.full),
                    new Grafico(app, "alas.menu").element.class(dashboard.full),
                    Card(
                        Z("h3").text("Itens mais acessados"),
                        Z("p").text("2h 21min")
                    ).class(dashboard.half)
                    /* "Aqui tera um dashboard com estatiscas dos pedidos, inventario e aplicativo" */
                ),
                Z("div").class(dashboard["dashboard"]).children(
                    Title("Pedidos").class(dashboard["full"]),//seria interessante a view do componente se inscrever no componente dai quando ele alterar então alteraria 
                    new Acesso(app).create("alasmenu.com"),
                    new Acesso(app).create("festivaldedelivery.alas.menu"),
                    Card(
                        Z("h3").text("Tempo no aplicativo"),
                        Z("p").text("2h 21min")
                    ).class(dashboard.half),
                    
                    Card(
                        Z("h3").text("Itens mais acessados"),
                        Z("p").text("2h 21min")
                    ).class(dashboard.half)
                    /* "Aqui tera um dashboard com estatiscas dos pedidos, inventario e aplicativo" */
                ),
                Z("div").class(dashboard["dashboard"]).children(
                    Title("Inventario").class(dashboard["full"]),//seria interessante a view do componente se inscrever no componente dai quando ele alterar então alteraria 
                    new Acesso(app).create("alasmenu.com"),
                    new Acesso(app).create("festivaldedelivery.alas.menu"),
                    Card(
                        Z("h3").text("Tempo no aplicativo"),
                        Z("p").text("2h 21min")
                    ).class(dashboard.half),
                    
                    Card(
                        Z("h3").text("Itens mais acessados"),
                        Z("p").text("2h 21min")
                    ).class(dashboard.half)
                    /* "Aqui tera um dashboard com estatiscas dos pedidos, inventario e aplicativo" */
                ),
            )
        }
    }
}