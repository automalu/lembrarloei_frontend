import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import ControllerCreateEstabelecimento from "../controllers/create";

export default class FormCreateEstabelecimento extends Form {
    constructor(app: App) {
        super({}, "Criando Estabelecimento", new ControllerCreateEstabelecimento(app), {back: "Cancelar", next: "Criar"})
    }
    async getFields(): Promise<Fields> {
        return {
            "nome": Field.make("text", "Nome", "Lanxis"),
            "id": Field.make("text", "Identificador (será usado no link)", "lanxis"),
        }
    }
    
}