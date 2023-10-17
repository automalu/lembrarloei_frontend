import Z, { Zeyo } from "zeyo";
import App from "../../app";
import AdapterEmpty from "../../component/adapter";
import CardSimple from "../../component/cardSimple";
import ListaHorizontal from "../../component/listaHorizontal";
import Modal from "../../modal";
import { StateBaseConstructor } from "../../navigation/state";
import OptionEstabelecimento from "../estabelecimento/options";

export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App): Promise<Zeyo> {
            const [itens, horizontal] = new ListaHorizontal(app, CardSimple).watch({
                adapter: new AdapterEmpty("full",
                    (estabelecimento) => {
                        app.navigation.next(new OptionEstabelecimento(estabelecimento),app)
                    },
                    [{ component: "title", object: "nome" }, { component: "description", object: "tipo" }]
                ),
                title: "Estabelecimentos",
                list: ([] as { title: string, description: string }[])
            });
            (async () => {
                const [result, err] = await app.repository.findOne("UsuarioEstabelecimentos", { username: "" });
                if (err || !result) return console.error(result);
                itens.list.push(...result.estabelecimentos.map((e: any) => e.estabelecimento))
            })();
            return Z("div").class("state-component").children(
                await horizontal.create(itens),
            )
        }
    }
}