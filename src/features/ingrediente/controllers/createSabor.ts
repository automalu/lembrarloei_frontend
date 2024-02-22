import Form from "../../../form";
import Controller from "../../../interface/controller";
import Modal from "../../../modal";

export default class CreateSabor extends Controller {
    async execute(form: Form) {
        console.log("entrou no create item");
        console.log(form);
        const item = {
            estabelecimento: this.app.session.estabelecimento._id,
        }
        Object.assign(item, form.model)
        Object.assign(item, form.data)
        console.log(item)
        const [result, err] = await this.app.repository.create("Itens", item);
        if(err) return console.error(result);

        Modal.back()
    }
}