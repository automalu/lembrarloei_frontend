import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import Modal from "../../../modal";
import CreateItem from "../controllers/createItem";

export default class FormSelectCategoria extends Form {
    app: App
    name = "Add"
    lista: any[]
    constructor(app: App, model: any, lista: any[]) {
        super(model, "Selecione Item", new CreateItem(app), { back: "Voltar", next: "none" })
        this.app = app
        this.lista = lista
    }
    async getFields(o?: any): Promise<Fields> {
        const [result, err] = await this.app.repository.findMany("Itens", {
            estabelecimento: this.app.session.estabelecimento._id,
            tipo: "categoria"
        })
        if (err) return { "itens": Field.make("show", `Error: ${result}`) }
        console.log(result, err)
        return {
            /* aqui e melhor usar um checkbox */
            "itens": Field.make("objectv", result.map(i => ({ value: i._id, name: i.titulo })), async categoria => {
                console.log("categoria selecionando")
                console.log(categoria.value)
                console.log("item")
                console.log(this.model._id)
                const [result, err] = await this.app.repository.create("SubItens", {
                    "parent": categoria.value,
                    "item": this.model._id,
                    "index": 2,
                    "estabelecimento": this.model.estabelecimento
                })
                Modal.back()
            })
        }
    }
}