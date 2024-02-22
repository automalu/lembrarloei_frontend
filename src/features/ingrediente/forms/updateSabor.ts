import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import UpdateItem from "../controllers/update";
import FormCreateSabor from "./createSabor";

export default class FormUpdateSabor extends Form {
    model: any;
    lista: any;
    name: string;
    app: App;
    constructor(app: App, model: any, lista: any) {
        super(model, model.titulo, new UpdateItem(app), {back: "Voltar", next: "Atualizar"})
        this.name = model.titulo
        this.app = app
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        const fields: Fields = {
            "tipo": Field.make("show", "tipo"),
            "titulo": Field.make("text", "Título", "Texto"),
            "descricao": Field.make("text", "Descrição", "Texto"),
            "img": Field.make("text", "Imagem", "30,00"),
            "topimg": Field.make("text", "Imagem de Cima", "30,00"),
        };
        return fields
    }
}