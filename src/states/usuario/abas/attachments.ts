import Z, { Zeyo } from "zeyo";
import AbaComponente from "../../../component/abas/aba/componente";
import Modal from "../../../modal";
import Button from "../../../component1.1/atoms/buttons";
import FormCreateEvento from "../../../features/evento/form/create";
import App from "../../../app";
import ObjectList from "../../../component1.1/molecules/objectList";

export default class AbaAttachments extends AbaComponente {
    value = "Attachments"
    titulo = "Anexos"
    componente: Zeyo = Z("div")
    client: any
    constructor(app: App, obj?: any) {
        super(app);
        this.client = obj
    }

    async create(obj?: any): Promise<Zeyo> {
        return this.componente.children(
            new ObjectList(this.app, "Anexos").pushHeader(
                new Button().text("Novo Anexo").click(() =>
                    Modal.show(this.app, (new FormCreateEvento(this.app, this.client) as any)),
                )
            ).object(async o => {
                //todo aqui pego os anexos e faço um push para o array de anexos
            })
        )
    }
}