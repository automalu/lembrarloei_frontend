import App from "../../../app";
import Form from "../../../form";
import { Build, Field } from "../../../form/field";
import Modal from "../../../modal";
import CreateItem from "../controllers/createItem";

export default class FormSelectItem extends Form {
    app: App
    name = "Add"
    lista: any[]
    constructor(app: App, model: any, lista: any[]) {
        super(model, "Selecione Item", new CreateItem(app), { back: "Voltar", next: "none" })
        this.app = app
        this.lista = lista
    }
    async getFields(o?: any): Promise<{ [key: string]: Field; }> {
        const [result, err] = await this.app.repository.findMany("Itens", {
            estabelecimento: this.app.session.estabelecimento._id,
            tipo: "item"
        })
        if (err) return { "itens": Build.field("show", `Error: ${result}`) }
        console.log(result, err)
        return {
            /* aqui e melhor usar um checkbox */
            "itens": Build.field("objectv", result.map(i => ({ value: i._id, name: i.titulo })), async item => {
                console.log(item.value)
                console.log(this.model._id)
                const subItem = {
                    parent: this.model._id,
                    item: item.value,
                    index: this.lista.length,
                    estabelecimento: this.model.estabelecimento
                }

                console.log(subItem)
                const [result, err] = await this.app.repository.create("SubItens", subItem)
                console.log(result, err)
                Modal.back()
            })
        }
    }
}