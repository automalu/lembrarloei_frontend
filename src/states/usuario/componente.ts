import Z, { Zeyo } from "zeyo";
import App from "../../app";
import { StateBaseConstructor } from "../../navigation/state";
import Abas from "../../component/abas";
import AbaEventos from "./abas/eventos";
import AbaLembretes from "./abas/lembretes";

export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App): Promise<Zeyo> {
            return (await new Abas(app)
                .push(new AbaEventos(app))
                .push(new AbaLembretes(app))
                .create()).class("state-component")
        }
    }
}