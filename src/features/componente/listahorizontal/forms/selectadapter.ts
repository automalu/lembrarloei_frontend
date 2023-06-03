import App from "../../../../app";
import ComponenteTemplate from "../../../../core/entity/ComponenteTemplate";
import Form from "../../../../form";
import { NameValueList } from "../../../../form/components/_list";
import { Field, Fields } from "../../../../form/field";
import Modal from "../../../../modal";
import CreateComponente from "../../controllers/createComponente";
import FormAdapter from "../../forms/adapter";

export default class FormListaHorizontalSelectAdapter extends Form {
    app: App;
    model: ComponenteTemplate;
    lista: any;
    constructor(app: App, model: ComponenteTemplate, lista: any) {
        super(model, "Escolha a Categoria para Lista Horizontal", new CreateComponente(app), { back: "Voltar", next: "none" })
        this.app = app
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        const fields: Fields = {
            "itens": Field.make("show", "ERRO")
        }
        
        const [itens, err] = await this.app.repository.findMany("Itens", {
            estabelecimento: this.app.session.estabelecimento._id,
            tipo: "categoria",
        });
        if (err) {
            console.error(itens);
            this.model.itens = itens
            return fields
        }
        const list: NameValueList = itens.map(i => ({ name: i.titulo, value: i._id, item: i }))

        fields["itens"] = Field.make("objectv", list, (i: any) => {
            console.log(i)
            Modal.push(new FormAdapter(this.app, { template: this.model, item: i.item }, this.lista))
        });
        return fields
    }
}