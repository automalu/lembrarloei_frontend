import App from "../../../app";
import ComponenteTemplate from "../../../core/entity/ComponenteTemplate";
import Form from "../../../form";
import { Build, Field } from "../../../form/field";
import Modal from "../../../modal";
import CreateComponente from "../controllers/createComponente";
import FormsComponentes, { FormComponente } from "./componentes";
type ValueNameForm = { value: string; name: string; form: FormComponente, template: ComponenteTemplate }

export default class FormSelectTipoComponente extends Form {
    app: App
    lista: any;
    constructor(app: App, lista: any) {
        super({}, "Novo Componente", new CreateComponente(app), { back: "none", next: "none" })
        this.app = app
        this.lista = lista
    }
    async getFields(): Promise<{ [key: string]: Field }> {
        const fields: { [key: string]: Field } = {
            "tipos": Build.field("show", "ERRO")
        };
        this.model.tipo = "Erro ao pegar templates";
        const tipos: ValueNameForm[] = [];
        const [templates, err] = await this.app.repository.findMany("ComponentesTemplates", {});
        if (err) {
            console.error(templates);
            return fields;
        };
        console.log(templates);
        templates.forEach(t => tipos.push({ 
            value: t._id, 
            name: t.titulo, 
            form: FormsComponentes.list[t.tipo].form,
            template: t
        }));
        fields["tipos"] = Build.field("objectv", tipos, (t: ValueNameForm) => {
            console.log(t)
            Modal.push(new t.form(this.app, t.template, this.lista))
        });
        return fields
    }
}