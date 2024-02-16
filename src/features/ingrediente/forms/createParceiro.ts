import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import CreateItem from "../controllers/createItem";

export default class FormParceiro extends Form {
    model: any;
    lista: any;
    constructor(app: App, model: any, lista: any) {
        super(model, "Novo Parceiro", new CreateItem(app), {back: "none", next: "Criar"})
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        return {
            "titulo": Field.make("text", "Nome", "Nome do Parceiro"),
            "instagram": Field.make("text", "Instagram", "nomeparceiro"),
            "endereco": Field.make("text", "Endereço", "Rua Tal numero 0000"),
            "img": Field.make("text", "Imagem", "Texto"),
        }
    }
}