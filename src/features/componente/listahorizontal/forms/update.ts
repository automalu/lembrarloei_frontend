import App from "../../../../app";
import Form from "../../../../form";
import { Field, Fields } from "../../../../form/field";
import UpdateListaHorizontal from "../controllers/update";
import FormSelectTipoSubComponente from "./sub/select";

export default class FormUpdateListaHorizontal extends Form{
    app: App
    constructor(app: App, model: any) {
        super(model, model.titulo, new UpdateListaHorizontal(app), {back: "none", next: "Atualizar"});
        this.app = app;
    }
    async getFields(): Promise<Fields> {
        const lista: any[] = []
        lista.push(new FormSelectTipoSubComponente(this.app, this.model))
        return {
            "titulo": Field.make("show", "Titulo"),
            "sub": Field.make("objecth", "Componente dos itens", lista)
        }
    }
}