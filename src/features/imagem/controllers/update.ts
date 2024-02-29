import Z from "zeyo";
import Snackbar from "../../../component/snackbar";
import Form from "../../../form";
import Controller from "../../../interface/controller";
import Modal from "../../../modal";

export default class UpdateImagem extends Controller {
    async execute(form: Form) {
        console.log("entrou no create item");
        console.log(form);
        const update = { estabelecimento: form.model.estabelecimento }
        Object.assign(update, form.data)
        const [result, err] = await this.app.repository.update("Imagens", form.model._id, update)
        console.log(result, err)
        //Snackbar(this.app, Z("p").text(`Criado 😎`))
    }
}