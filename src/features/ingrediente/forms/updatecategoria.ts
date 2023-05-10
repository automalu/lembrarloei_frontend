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
        super(model, model.titulo, new UpdateItem(app), {back: "none", next: "Atualizar"})
        this.app = app
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<{ [key: string]: Field }> {
        return {
            "tipo": Build.field("show", "tipo"),
            "titulo": Build.field("text", "Título", "Estou super empolgado"),
            "filhos": Build.field("objecth", "Itens", [new FormSelectItem(this.app, this.model)], adapter => {
                console.log(adapter)
                if(adapter.name === "Add") Modal.push(adapter)
            }),
        }
    }
}