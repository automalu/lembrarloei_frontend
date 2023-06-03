import App from "../../../../app";
import Form from "../../../../form";
import { NameValue } from "../../../../form/components/_list";
import { Field, Fields } from "../../../../form/field";
import Modal from "../../../../modal";
import FormSelectTipoComponente from "../../forms/select";

export default class FormSelectSubComponente extends Form{
    app: App
    name = "Add"
    constructor(app: App, model: any) {
        super(model, "Selecione Componente", ({} as any), {back: "Voltar", next: "none"});
        this.app = app;
    }
    async getFields(): Promise<Fields> {
        const lista: NameValue[] = []
        lista.push({value: "new", name: "Criar novo"})
        return {
            "sub": Field.make("objectv", lista, i => {
                if(i.value === "new")
                    Modal.push(new FormSelectTipoComponente(this.app, {list: []}))
            })
        }
    }
}