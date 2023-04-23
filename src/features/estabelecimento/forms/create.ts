import App from "../../../app";
import Form from "../../../form";
import { Build, Field } from "../../../form/field";
import ControllerCreateEstabelecimento from "../controllers/create";

export default class FormCreateEstabelecimento extends Form {
    constructor(app: App) {
        super({}, "Criando Estabelecimento", new ControllerCreateEstabelecimento(app), {back: "Cancelar", next: "Criar"})
    }
    async getFields(): Promise<{ [key: string]: Field; }> {
        return {
            "nome": Build.field("text", "Nome", "Lanxis"),
            "id": Build.field("text", "Identificador (será usado no link)", "lanxis"),
        }
    }
    
}