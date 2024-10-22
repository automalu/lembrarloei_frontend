import Z, { Zeyo } from "zeyo";
import AbaComponente from "../../../component/abas/aba/componente";
import ListaHorizontal from "../../../component1.1/listaHorizontal";
import Modal from "../../../modal";
import Button from "../../../component1.1/atoms/buttons";
import CardEvento from "../../../component1.1/organisms/cardEvento";
import FormUpdateEvento from "../../../features/evento/form/update";
import FormCreateEvento from "../../../features/evento/form/create";

export default class AbaEventos extends AbaComponente {
    value = "eventos"
    titulo = "Eventos"
    componente: Zeyo = Z("div")
    async create(obj?: any): Promise<Zeyo> {
        return this.componente.children(
            new Button().text("Criar").click(() =>
                Modal.show(this.app, (new FormCreateEvento(this.app) as any)),
            ),
            new ListaHorizontal(this.app, "Eventos").object(async o => {
                const [result, err] = await this.app.repository.read("Events", "")
                if (err) return console.error(result)
                o.push(...result.map((e: any) => new CardEvento().setInfo(e).click(() => {
                    Modal.show(this.app, (new FormUpdateEvento(this.app, e) as any))
                })));
            })
        )
    }
}