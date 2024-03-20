import { Zeyo, ZeyoAs } from 'zeyo';
import App from '../../../app';
import Form from '../../../form';
import { Field, Fields } from '../../../form/field';
import CreateRegras from '../controller';
import Regras from '../list';
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
        const list: {name: string, value: string}[] = Object.keys(Regras.maplist).map(key => ({value: key, name: Regras.maplist[key]}))
        const fields: Fields = {
            "tipo": Field.make("select", "Tipo", list).object(o => {
                o.element.on("change", () => {
                    if(o.getValue() === "obrigatorio"){
                        this.fields["item"] = Field.make("select", "Item", []).object(async f => {
                            const [result, err] = await this.app.repository.findMany("SubItem", {
                                estabelecimento: this.model.estabelecimento,
                                parent: this.model._id
                            })
                            f.zElement.HTML("").children(...Field.make("select", "Item", result.map(i => ({value: i.item._id, name: i.item.titulo}))).object(o => {
                                o.create()
                                f.element = o.element
                            }).zElement.childList)
                        });
                        (this.element.childList[0] as ZeyoAs<"div">).children(this.fields["item"].create("item"));
                    }else if(this.fields["item"]) {
                        this.fields["item"].zElement.element.remove()
                    }
                })
            }),
            "value": Field.make("text", "Quantidade", "4"),
        };
        return fields
    }
}
