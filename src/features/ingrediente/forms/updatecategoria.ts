import App from "../../../app";
import Form from "../../../form";
import { Build, Field } from "../../../form/field";
import Modal from "../../../modal";
import UpdateItem from "../controllers/update";
import FormSelectItem from "./selectItem";

export default class FormUpdateCategoria extends Form {
    app: App
    model: any;
    lista: any;
    constructor(app: App, model: any, lista: any) {
        super(model, model.titulo, new UpdateItem(app), { back: "none", next: "Atualizar" })
        this.app = app
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<{ [key: string]: Field }> {
        /* Talvez o melhor seja criar uma colecao para cada tipo que pode possuir um subitem */
        const [listaSubItens, err] = await this.app.repository.findMany("SubItem", {
            parent: this.model._id,
            estabelecimento: this.model.estabelecimento
        })
        console.log(listaSubItens, err)
        const lista: any[] = []
        listaSubItens.forEach(i => lista.push({name: i.item.titulo}))
        lista.push(new FormSelectItem(this.app, this.model, listaSubItens))
        return {
            "tipo": Build.field("show", "tipo"),
            "titulo": Build.field("text", "Título", "Estou super empolgado"),
            "filhos": Build.field("objecth", "Itens", lista, adapter => {
                console.log(adapter)
                if (adapter.name === "Add") Modal.push(adapter)
            }),
        }
    }
}