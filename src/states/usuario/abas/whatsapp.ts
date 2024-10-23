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

export default class AbaWhatsapp extends AbaComponente {
    value = "Whatsapp"
    titulo = "Whatsapp"
    componente: Zeyo = Z("div")
    client: any
    constructor(app: App, obj?: any) {
        super(app);
        this.client = obj
    }

    async create(obj?: any): Promise<Zeyo> {
        return this.componente.children(
            new ObjectList(this.app, "Whatsapp").object(async o => {
                o.push(Z("span").text("aqui terá um chat para o whats do cliente"));
                
            })
        )
    }
}