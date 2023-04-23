import Form from "../../../form";
import Controller from "../../../interface/controller";

export default class ControllerCreateEstabelecimento extends Controller {
    async execute(form: Form) {
        console.log(form)
        const [result, err] = await this.app.repository.create("Estabelecimentos", {
            nome: form.data.nome,
            id: form.data.id,
            criador: ""
        })
        this.app.hash.remove()
        /* ESTA dando user not allowed */
        console.log(result, err)
    }
}