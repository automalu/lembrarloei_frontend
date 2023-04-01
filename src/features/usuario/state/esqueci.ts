import FormEsqueci from "../form/esqueci";
import FormLogin from "../form/login";
import StateLogin from "./login";
import FormState from "./_state";

export default class StateEsqueci implements FormState {
    texts = {
        pergunta: "Lembrou sua senha?",
        acao: "Entre"
    }
    form: typeof FormLogin = FormEsqueci;
    esqueci(): FormState {
        return new StateLogin()
    }
    acao(): FormState {
        return new StateLogin()
    }

}