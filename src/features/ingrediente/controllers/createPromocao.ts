import Z from "zeyo";
import Snackbar from "../../../component/snackbar";
import Form from "../../../form";
import Controller from "../../../interface/controller";
import Modal from "../../../modal";

export default class CreatePromocao extends Controller {
    async execute(form: Form) {
        console.log("entrou no create item");
        console.log(form);
        Snackbar(this.app, Z("p").HTML(`Criando <b>${form.data.titulo}</b>`))
        const item = {
            estabelecimento: this.app.session.estabelecimento._id,
            tipo: "promocao",
            url: form.data.titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[" "]/g, "-")
        }
        Object.assign(item, form.data)
        console.log(item)
        const [result, err] = await this.app.repository.create("Itens", item);
        if(err) return console.error(result);
        await Modal.back()
        Snackbar(this.app, Z("p").text(`Criado 😎`))
    }
}