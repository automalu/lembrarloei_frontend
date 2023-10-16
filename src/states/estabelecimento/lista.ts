import Estabelecimento from ".";
import { StateConstructor } from "../../navigation/state";
import EstabelecimentoParceiro from "./parceiro";

export default class Lista {
    static tipos: {[key: string]: StateConstructor} = {
        "parceiroondeir": EstabelecimentoParceiro
    }
}