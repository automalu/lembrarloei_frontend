import Form from "../../../form";
import Controller from "../../../interface/controller";

export default class CreateComponente extends Controller {
    execute(form: Form): void {
        const componente = {
            titulo: form.data.titulo,
            tipo: form.model.value
        }
        console.log(componente)
    }
}