import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import CreateItem from "../controllers/createItem";
import CreatePromocao from "../controllers/createPromocao";

export default class FormPromocao extends Form {
    model: any;
    parceiro: any;
    lista: any;
    novo = true
    name = "Add"
    img = "none"
    constructor(app: App, parceiro: any, lista: any) {
        const model = {
            restaurante: parceiro._id,
            tipo: "promocao"
        }
        super(model, "Nova Promoção", new CreatePromocao(app), { back: "none", next: "Criar" })
        this.model = model
        this.parceiro = parceiro
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        return {
            "titulo": Field.make("text", "Nome", "Texto"),
            "descricao": Field.make("text", "Descrição", "Texto"),
            "preco": Field.make("text", "Preço", "30,00"),
            "img": Field.make("text", "img", "https://example.com/image.png"),
            "restaurante": Field.make("show", "Parceiro"),//TODO tenho que fazer um show q
            "link": Field.make("text", "Link", "https://parceiro.com/link-para-promocao"),
        }
    }
}