import Z, { Zeyo } from "zeyo";
import AbaComponente from "../../../component/abas/aba/componente";
import ListaHorizontal from "../../../component1.1/listaHorizontal";
import FormModal from "../../../modal";
import Button from "../../../component1.1/atoms/buttons";
import CardEvento from "../../../component1.1/organisms/cardEvento";
import FormUpdateEvento from "../../../features/evento/form/update";
import FormCreateEvento from "../../../features/evento/form/create";
import FormCreateClient from "../../../features/client/form/create";
import CardCliente from "../../../component1.1/organisms/cardClient";
import Modal from "../../../component1.1/molecules/modal";
import LayoutColumnsToTabs from "../../../component1.1/layout/columnsToTab";
import Abas from "../../../component/abas";
import AbaEventos from "./eventos";
import AbaLembretes from "./lembretes";

export default class AbaClientes extends AbaComponente {
    value = "Clientes"
    titulo = "Clientes"
    componente: Zeyo = Z("div")
    async create(obj?: any): Promise<Zeyo> {
        return this.componente.children(
            new Button().text("Criar").click(() =>
                FormModal.show(this.app, (new FormCreateClient(this.app) as any)),
            ),
            new ListaHorizontal(this.app, "Clientes").object(async o => {
                const [result, err] = await this.app.repository.read("Clients", "")
                if (err) return console.error(result)
                o.push(...result.map((e: any) => new CardCliente().setInfo(e).click(() => {
                    new Modal(
                        this.app,
                        new LayoutColumnsToTabs(this.app).setSlides((changeSlide) => [
                            new Abas(this.app)
                                .push(new AbaEventos(this.app).setSelected())
                                .push(new AbaLembretes(this.app))
                                .create(),
                            new FormUpdateEvento(this.app, e),
                        ])
                    )
                })));
            })
        )
    }
}