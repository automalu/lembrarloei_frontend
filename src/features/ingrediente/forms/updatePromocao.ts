import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import UpdateItem from "../controllers/update";
import FormSelectCategoria from "./selectCategoria";

export default class FormUpdatePromocao extends Form {
    model: any;
    parceiro: any;
    lista: any;
    name = ""
    img = ""
    app: App
    constructor(app: App, model: any, lista: any) {
        super(model, model.titulo, new UpdateItem(app, true), {back: "Voltar", next: "Atualizar"})
        this.app = app
        this.model = model
        this.name = model.titulo
        this.img = model.img
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        const fields: Fields = {
            "titulo": Field.make("text", "Nome", "Estou super empolgado"),
            "descricao": Field.make("text", "Descrição", "Estou super empolgado"),
            "preco": Field.make("text", "Preço", "30,00"),
            "img": Field.make("text", "Imagem", "https://example.com/image.png"),
            "link": Field.make("text", "Link", "https://parceiro.com/link-para-promocao"),
            "url": Field.make("show", "URL"),
        }
        const [result, err] = await this.app.repository.findMany("ParentsItem", {
            estabelecimento: this.model.estabelecimento,
            subitem: this.model._id
        })
        if(err) {
            console.error(result);
            return fields
        }
        const lista: any[] = []
        result.forEach(i => lista.push(new FormUpdatePromocao(this.app, i, lista)))
        lista.push(new FormSelectCategoria(this.app, this.model, lista))
        fields["categoria"] = Field.make("objecth", "Categorias", lista)
        return fields
    }
}