import App from "../../../app";
import Form from "../../../form";
import Controller from "../../../interface/controller";
import Modal from "../../../modal";

export default class UpdateItem extends Controller {
    back?: boolean
    constructor(app: App, back?: boolean) {
        super(app)
        this.back = back
    }
    async execute(form: Form) {
        console.log("entrou no update");
        console.log(form);
        Object.assign(form.model, form.data)
        const [result, err] = await this.app.repository.update("Itens", form.model._id, form.model)
        console.log(result, err)
        if (this.back) Modal.back()
        else
            this.app.hash.remove()
    }
}