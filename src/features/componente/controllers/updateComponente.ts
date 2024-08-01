import Form from "../../../form";
import Controller from "../../../interface/controller";

export default class UpdateComponente extends Controller {
    async execute(form: Form): Promise<void> {
        console.log(form)
        const [result, err] = await this.app.repository.update("Componentes", form.model._id, {
            estabelecimento: this.app.session.estabelecimento._id,
            img: form.data.img})
        console.log(result, err)
        this.app.hash.remove()
    }
}