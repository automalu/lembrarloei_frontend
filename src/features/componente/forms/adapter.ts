import App from "../../../app";
import ComponenteTemplate from "../../../core/entity/ComponenteTemplate";
import Form from "../../../form";
import { NameValue, NameValueList } from "../../../form/components/_list";
import { Build, Fields } from "../../../form/field";
import CreateComponente from "../controllers/createComponente";


export default class FormAdapter extends Form {
    app: App;
    model: { template: ComponenteTemplate, item: any };
    lista: any;
    constructor(app: App, model: any, lista: any) {
        super(model, "Adaptando Lista Horizontal no Item", new CreateComponente(app), { back: "Voltar", next: "Criar" })
        this.app = app
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        /* aqui vai fazer campos dinamicos de acordo com a quantidade de campos na template */
        const fields: Fields = {}
        for (const key in this.model.template.campos) {
            fields[key] = Build.field("select", key, Object.keys(this.model.item).map(k => ({ value: k, name: k })))
        }
        return fields
    }
}