import Form from "../../../../form";
import Controller from "../../../../interface/controller";

export default class SetSubComponente extends Controller {
    async execute(form: Form): Promise<void> {
        console.log(form)
        const parent: any = (form as any).parent
        const sub = {
            tipo: form.model.template.tipo,
            adapter: form.data
        }
        parent.sub = sub
        console.log(parent)
        /* Aqui precisa enviar para o banco */
        this.app.hash.remove()
    }
}