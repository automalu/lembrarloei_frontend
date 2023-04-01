import LoginOpt from "../../../form/components/loginOpt";
import FormState from "./_state";

export default class FormStore {
    static model: any
    static opt = new Proxy(new LoginOpt(), {
        set: (target, key, value) => {
            if (key === "main")
                target.main.element.parentElement?.replaceChild(value.element, target.main.element);
            target[key as keyof typeof target] = value
            return true
        }
    })
    static obj:{state: FormState}
    static changeState(transition: string) {
        const transitions: { [key: string]: () => FormState } = {
            "esqueci": this.obj.state.esqueci,
            "acao": this.obj.state.acao,
        }
        this.obj.state = transitions[transition]()
    }
}