import Z from "zeyo";
import App from "../../../../app";
import Adapter from "../../../../component/adapter";
import CardSimple from "../../../../component/cardSimple";
import ListaHorizontal from "../../../../component/listaHorizontal";
import Painel from "../../../../component/painel";
import FormSelectTipoComponente from "../../../../features/componente/forms/select";
import FormUpdateListaHorizontal from "../../../../features/componente/listahorizontal/forms/update";
import Modal from "../../../../modal";
import { StateBaseConstructor } from "../../../../navigation/state";

export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App) {
            const [lista, painel] = new Painel(app).watch(([] as any[]));
            (async () => {
                const [result, err] = await app.repository.findMany("Componentes", { estabelecimento: app.session.estabelecimento._id })
                if (err) return console.error(result);
                lista.push(...result)
                console.log(result, err)
            })();

            return Z("div").class("state-component").children(
                Z("div").children(
                    await painel.create(lista)
                ),
            )
        }
    }
}