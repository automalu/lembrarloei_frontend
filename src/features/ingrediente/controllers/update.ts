import Form from "../../../form";
import Controller from "../../../interface/controller";

export default class UpdateItem extends Controller {
    async execute(form: Form) {
        console.log("entrou no update");
        console.log(form);
        Object.assign(form.model, form.data)
        const [result, err] = await this.app.repository.update("Itens", form.model._id, form.model)
        console.log(result, err)
        this.app.hash.remove()
    }
}