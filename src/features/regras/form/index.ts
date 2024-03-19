import App from '../../../app';
import Form from '../../../form';
import { Field, Fields } from '../../../form/field';
import CreateRegras from '../controller';
export default class FormCreateRegras extends Form {
    model: any;
    name = "Add"
    app: App;
    constructor(app: App, model: any) {
        super(model, 'Criando Regra', new CreateRegras(app), {back: 'Voltar', next: 'Criar'})
        this.app = app
        this.model = model
    }
    async getFields(): Promise<Fields> {
        const fields: Fields = {
            "tipo": Field.make("select", "Tipo", [{name:"Limite", value:"limite"}, {name: "Variedade", value: "variedade"}]),
            "value": Field.make("text", "Quantidade", "4"),
        };
        return fields
    }
}
