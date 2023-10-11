import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import UpdateItem from "../controllers/update";

export default class FormUpdatePromocao extends Form {
    model: any;
    parceiro: any;
    lista: any;
    name = ""
    constructor(app: App, model: any, lista: any) {
        super(model, model.titulo, new UpdateItem(app, true), {back: "Voltar", next: "Atualizar"})
        this.model = model
        this.name = model.titulo
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        return {
            "titulo": Field.make("text", "Nome", "Estou super empolgado"),
            "descricao": Field.make("text", "Descrição", "Estou super empolgado"),
            "preco": Field.make("text", "Preço", "30,00"),
            "img": Field.make("text", "Imagem", "https://example.com/image.png"),
            "link": Field.make("text", "Link", "https://parceiro.com/link-para-promocao"),
            "url": Field.make("show", "URL")
        }
    }
}