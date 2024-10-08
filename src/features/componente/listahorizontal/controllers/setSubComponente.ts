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
        const [result, err] = await this.app.repository.update("Componentes", parent._id, {
            estabelecimento: this.app.session.estabelecimento._id,
            sub
        })
        console.log(result, err);
        this.app.hash.remove()
    }
}