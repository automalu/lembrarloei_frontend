import Z from "zeyo";
import App from "../../../app";
import Snackbar from "../../../component/snackbar";
import ComponenteTemplate from "../../../core/entity/ComponenteTemplate";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import CreateComponente from "../controllers/createComponente";

export default class FormCreateTabs extends Form {
    app: App;
    model: ComponenteTemplate;
    lista: any;
    constructor(app: App, model: ComponenteTemplate, lista: any) {
        super(model, "Criando Comoponente Abas", new CreateComponente(app), { back: "Voltar", next: "Criar" })
        this.app = app
        this.model = model
        this.lista = lista
    }

    async getFields(): Promise<Fields> {
        return {
            adapter: Field.make("select", "Adapter", [{value: "categoria", name: "Categoria"}]),
            sub: Field.make("text", "Sub", "")
        }
    }

}