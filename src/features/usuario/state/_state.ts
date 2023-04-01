import FormLogin from "../form/login"

export default interface FormState {
    texts: {pergunta: string; acao: string}
    form: typeof FormLogin
    alphabet?: {e: string, a: string}
    esqueci(): FormState
    acao(): FormState
}
