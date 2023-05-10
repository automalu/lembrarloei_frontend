import App from "../../../app";
import Form from "../../../form";
import { Build, Field } from "../../../form/field";
import CreateItem from "../controllers/createItem";

export default class FormSelectItem extends Form {
    app: App
    name = "Add"
    constructor(app: App, model: any) {
        super(model, "Selecione Item", new CreateItem(app), { back: "Voltar", next: "none" })
        this.app = app
    }
    async getFields(o?: any): Promise<{ [key: string]: Field; }> {
        const [result, err] = await this.app.repository.findMany("Itens", {
            estabelecimento: this.app.session.estabelecimento._id,
            tipo: "item"
        })
        if (err) return { "itens": Build.field("show", `Error: ${result}`) }
        console.log(result, err)
        return {
            "itens": Build.field("objectv", result.map(i => ({ value: i._id, name: i.titulo })), item => {
                console.log(item)
                /* aqui tenho que criar um objeto na colecao para relacionar os dois objetos */
            })
        }
    }
}