import FormLogin from "../form/login";
import StateCreate from "./create";
import StateEsqueci from "./esqueci";
import FormState from "./_state";

export default class StateLogin implements FormState {
    texts = {
        pergunta: "Não possui uma conta?",
        acao: "Crie sua conta"
    }
    form: typeof FormLogin = FormLogin;
    esqueci(): FormState {
        return new StateEsqueci()
    }
    acao(): FormState {
        console.log("acao")
        return new StateCreate()
    }

}