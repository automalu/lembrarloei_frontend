import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import CreateImagem from "../controllers/create";

export default class FormCreateImagem extends Form {
    model: any;
    parent: any;
    lista: any;
    novo = true
    name = "Add"
    img = "none"
    constructor(app: App, parent: any, lista: any) {
        const model = {
            estabelecimento: parent.estabelecimento,
            parent: parent._id,
        }
        super(model, "Nova Imagem", new CreateImagem(app), { back: "none", next: "Criar" })
        this.model = model
        this.parent = parent
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        return {
            "estabelecimento": Field.make("show", "Estabelecimento"),
            "parent": Field.make("show", "Item"),
        }
    }
}