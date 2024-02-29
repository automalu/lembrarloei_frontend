import Z from "zeyo";
import Snackbar from "../../../component/snackbar";
import Form from "../../../form";
import Controller from "../../../interface/controller";
import Modal from "../../../modal";

export default class UpdateImagem extends Controller {
    async execute(form: Form) {
        console.log("entrou no create item");
        console.log(form);
        Snackbar(this.app, Z("p").HTML(`Criando <b>${form.data.titulo}</b>`))
        
        Snackbar(this.app, Z("p").text(`Criado 😎`))
    }
}