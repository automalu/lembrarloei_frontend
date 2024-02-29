import Z from "zeyo";
import Snackbar from "../../../component/snackbar";
import Form from "../../../form";
import Controller from "../../../interface/controller";

export default class CreateImagem extends Controller {
    async execute(form: Form) {
        console.log("entrou no create item");
        console.log(form);
        Snackbar(this.app, Z("p").HTML(`Criando Imagem`))
        const [result, err] = await this.app.repository.create("Imagens", form.model)
        if(err)
        Snackbar(this.app, Z("p").text(`⚠️ ${result}`))
        else 
        Snackbar(this.app, Z("p").text(`Criado 😎`))
    }
}