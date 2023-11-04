import Z from "zeyo";
import App from "../../app";
import Abas from "../../component/abas";
import Aba from "../../component/abas/aba/aba";
import Adapter from "../../component/adapter";
import CardSimple from "../../component/cardSimple";
import CardSimpleImagem from "../../component/cardSimpleImagem";
import ListaHorizontal from "../../component/listaHorizontal";
import FormSelectTipoItem from "../../features/ingrediente/forms/select";
import FormUpdateItem from "../../features/ingrediente/forms/update";
import FormUpdateCategoria from "../../features/ingrediente/forms/updatecategoria";
import FormUpdateParceiro from "../../features/ingrediente/forms/updeteParceiro";
import Modal from "../../modal";
import { StateBaseConstructor } from "../../navigation/state";
import AbaCategorias from "./abas/categorias";
import AbaParceiro from "./abas/parceiro";

export default function Componente<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        async setComponente(app: App) {
            return (await new Abas(app)
                .push(new AbaParceiro(app))
                .push(new AbaCategorias(app))
                .create()).class("state-component")
        }
    }
}