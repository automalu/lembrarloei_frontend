import Z, { Zeyo } from "zeyo";
import AbaComponente from "../../../component/abas/aba/componente";
import ListaHorizontal from "../../../component1.1/listaHorizontal";
import FormModal from "../../../modal";
import Button from "../../../component1.1/atoms/buttons";
import FormUpdateEvento from "../../../features/evento/form/update";
import FormCreateClient from "../../../features/client/form/create";
import CardCliente from "../../../component1.1/organisms/cardClient";
import Modal from "../../../component1.1/molecules/modal";
import Abas from "../../../component/abas";
import AbaEventos from "./eventos";
import AbaLembretes from "./lembretes";
import TwoColumnsConfig from "../../../component1.1/molecules/twoColumnsConfig";
import ObjectList from "../../../component1.1/molecules/objectList";
import FormUpdateClient from "../../../features/client/form/update";
import AbaActivity from "./activity";
import AbaWhatsapp from "./whatsapp";
import AbaAttachments from "./attachments";

export default class AbaClientes extends AbaComponente {
    value = "Clientes"
    titulo = "Clientes"
    componente: Zeyo = Z("div")
    async create(obj?: any): Promise<Zeyo> {
        return this.componente.children(
            new ObjectList(this.app, "Clientes").pushHeader(
                new Button().text("Novo Cliente").click(() =>
                    FormModal.show(this.app, (new FormCreateClient(this.app) as any)),
                )
            ).object(async o => {
                const [result, err] = await this.app.repository.read("Clients", "")
                if (err) return console.error(result)
                o.push(...result.map((e: any) => new CardCliente().setInfo(e).click(() => {
                    new Modal(
                        this.app,
                        new TwoColumnsConfig(this.app,
                            new Abas(this.app)
                                .push(new AbaActivity(this.app, e).setSelected())
                                .push(new AbaEventos(this.app, e))
                                .push(new AbaWhatsapp(this.app, e))
                                .push(new AbaAttachments(this.app, e))
                                .create(),
                            new FormUpdateClient(this.app, e)
                        )
                    )
                })));
            })
        )
    }
}