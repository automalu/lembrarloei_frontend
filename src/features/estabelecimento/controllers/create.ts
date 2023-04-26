import Form from "../../../form";
import Controller from "../../../interface/controller";

export default class ControllerCreateEstabelecimento extends Controller {
    async execute(form: Form) {
        console.log(form)
        this.app.socket.emit("usecase/createestabelecimento", {
            nome: form.data.nome,
            id: form.data.id,
            criador: ""
        })
        const [result, err] = await this.app.socket.wait("usecase/createestabelecimento")
        console.log(result, err)
        this.app.hash.remove()
    }
}