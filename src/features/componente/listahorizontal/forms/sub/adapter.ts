import App from "../../../../../app";
import ComponenteTemplate from "../../../../../core/entity/ComponenteTemplate";
import Form from "../../../../../form";
import { Field, Fields } from "../../../../../form/field";
import SetSubComponente from "../../controllers/setSubComponente";


export default class FormAdapter extends Form {
    app: App;
    model: { template: ComponenteTemplate, item: any };
    parent: any;
    constructor(app: App, model: any, parent: any) {
        super(model, "Adaptando Lista Horizontal no Item", new SetSubComponente(app), { back: "Voltar", next: "Criar" })
        this.app = app
        this.model = model
        this.parent = parent
    }
    async getFields(): Promise<Fields> {
        /* aqui vai fazer campos dinamicos de acordo com a quantidade de campos na template */
        const fields: Fields = {}
        for (const key in this.model.template.campos) {
            fields[key] = Field.make("select", key, Object.keys(this.model.item).map(k => ({ value: k, name: k })))
        }
        return fields
    }
}