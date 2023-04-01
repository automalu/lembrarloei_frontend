import FormLogin from "../form/login";
import FormSignup from "../form/signup";
import StateLogin from "./login";
import FormState from "./_state";

export default class StateCreate implements FormState {
    texts = {
        pergunta: "Já possui uma conta?",
        acao: "Entre"
    }
    form: typeof FormLogin = FormSignup;
    esqueci(): FormState{
        return new StateLogin()
    }
    acao(): FormState{
        return new StateLogin()
    }

}