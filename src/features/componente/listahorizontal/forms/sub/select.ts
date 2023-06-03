import App from "../../../../../app";
import ComponenteTemplate from "../../../../../core/entity/ComponenteTemplate";
import Form from "../../../../../form";
import { Field, Fields } from "../../../../../form/field";
import Modal from "../../../../../modal";
import FormsComponentes, { FormComponente } from "../../../forms/componentes";
import FormAdapter from "./adapter";
type ValueNameForm = { value: string; name: string; template: ComponenteTemplate }

export default class FormSelectTipoSubComponente extends Form {
    app: App
    name = "Add"
    parent: any
    constructor(app: App, parent: any) {
        super({}, "Novo Componente", ({} as any), { back: "Voltar", next: "none" })
        this.app = app
        this.parent = parent
    }
    async getFields(): Promise<Fields> {
        const fields: Fields = {
            "tipos": Field.make("show", "ERRO")
        };
        this.model.tipo = "Erro ao pegar templates";
        const tipos: ValueNameForm[] = [];
        
        const [templates, err] = await this.app.repository.findMany("ComponentesTemplates", {});
        if (err) {
            console.error(templates);
            return fields;
        };
        templates.forEach(t => tipos.push({ 
            value: t._id, 
            name: t.titulo, 
            template: t
        }));

        const [sub, ierr] = await this.app.repository.findOne("SubItem", {
            estabelecimento: this.app.session.estabelecimento._id,
            parent: this.parent.item
        })
        if(ierr) console.error(sub);
        
        fields["tipos"] = Field.make("objectv", tipos, (t: ValueNameForm) => {
            console.log(t)
            Modal.push(new FormAdapter(this.app, { template: t.template, item: sub ? sub.item : {} }, this.parent))
        });
        return fields
    }
}