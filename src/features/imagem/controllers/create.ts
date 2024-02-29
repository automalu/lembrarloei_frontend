import Z from "zeyo";
import Snackbar from "../../../component/snackbar";
import Form from "../../../form";
import Controller from "../../../interface/controller";
import Modal from "../../../modal";

export default class CreateImagem extends Controller {
    async execute(form: Form) {
        console.log("entrou no create item");
        console.log(form);
        Snackbar(this.app, Z("p").HTML(`Criando <b>${form.data.titulo}</b>`))
        console.log(form.model)
        const [result, err] = await this.app.repository.create("Imagens", form.model)
        console.log(result, err)
        Snackbar(this.app, Z("p").text(`Criado 😎`))
    }
}