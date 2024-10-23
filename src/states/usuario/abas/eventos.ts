import Z, { Zeyo } from "zeyo";
import AbaComponente from "../../../component/abas/aba/componente";
import ListaHorizontal from "../../../component1.1/listaHorizontal";
import Modal from "../../../modal";
import Button from "../../../component1.1/atoms/buttons";
import CardEvento from "../../../component1.1/organisms/cardEvento";
import FormUpdateEvento from "../../../features/evento/form/update";
import FormCreateEvento from "../../../features/evento/form/create";
import App from "../../../app";
import ObjectList from "../../../component1.1/molecules/objectList";

export default class AbaEventos extends AbaComponente {
    value = "eventos"
    titulo = "Eventos"
    componente: Zeyo = Z("div")
    client: any
    constructor(app: App, obj?: any) {
        super(app);
        this.client = obj
    }

    async create(obj?: any): Promise<Zeyo> {
        return this.componente.children(
            new ObjectList(this.app, "Eventos").pushHeader(
                new Button().text("Novo Evento").click(() =>
                    Modal.show(this.app, (new FormCreateEvento(this.app, this.client) as any)),
                )
            ).object(async o => {
                if (!this.client) return
                this.setEvents(o);
                this.app.repository.createTriggerTo("Events", () => this.setEvents(o), "create", "delete");
            })
        )
    }

    async setEvents(o: ObjectList) {
        const [result, err] = await this.app.repository.read("Events", { client_id: this.client.id })
        if (err) return console.error(result)
        o.resetList().push(...result.map((e: any) => new CardEvento().setInfo(e).click(() => {
            Modal.show(this.app, (new FormUpdateEvento(this.app, e) as any))
        })));
    }
}