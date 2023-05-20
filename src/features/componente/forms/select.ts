import App from "../../../app";
import Form from "../../../form";
import { Build, Field } from "../../../form/field";
import Modal from "../../../modal";
import CreateComponente from "../controllers/createComponente";
import FormsComponentes, { FormComponente } from "./componentes";
type ValueNameForm = { value: string; name: string; form: FormComponente }

export default class FormSelectTipoComponente extends Form {
    app: App
    lista: any;
    constructor(app: App, lista: any) {
        super({}, "Novo Componente", new CreateComponente(app), { back: "none", next: "none" })
        this.app = app
        this.lista = lista
    }
    async getFields(): Promise<{ [key: string]: Field }> {
        const tipos: ValueNameForm[] = []
        for (const key in FormsComponentes.list)
            tipos.push({ value: key, name: FormsComponentes.list[key].name, form: FormsComponentes.list[key].form })
        return {
            "tipos": Build.field("objectv", tipos, (t: ValueNameForm) => {
                console.log(t)
                Modal.push(new t.form(this.app, t, this.lista))
            })
        }
    }
}