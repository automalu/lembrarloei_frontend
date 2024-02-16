import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
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
    async getFields(): Promise<Fields> {
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
            "tipo": Field.make("show", "tipo"),
            "titulo": Field.make("text", "Título", "Estou super empolgado"),
            "filhos": Field.make("objecth", "Itens", lista, adapter => {
                console.log(adapter)
                if (adapter.name === "Add") Modal.push(adapter)
            }),
        }
    }

    delete = true
    async onDelete(): Promise<void> {
        console.log(this.model, this.lista);
        /* this.listaSubItens.forEach(async subform => {
            if (subform.novo) return
            const [result, err] = await this.app.repository.delete("Itens", subform.model._id)
            console.log("Deletando Sub Itens", result, err)
        })
        /* Aqui tem que deletar os subelementos 
        const [result, err] = await this.app.repository.delete("Itens", this.model._id)
        console.log(result, err)
        const maped = this.lista.map(i => i._id)
        const index = maped.indexOf(this.model._id)
        if (index > -1) {
            this.lista.splice(index, 1);
        } */
        this.app.hash.remove()
    }
}