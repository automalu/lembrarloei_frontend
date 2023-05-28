import Form from "../../../form";
import Controller from "../../../interface/controller";

export default class CreateComponente extends Controller {
    async execute(form: Form): Promise<void> {
        console.log(form)
        /* Todo: aqui vai ter que chamar um usecase para cada componente */
        const componente = {
            titulo: form.model.item.titulo,
            tipo: form.model.template.tipo,
            estabelecimento: this.app.session.estabelecimento._id,
            item: form.model.item._id,
            adapter: form.data
        }
        console.log(componente)
        const [result, err] = await this.app.repository.create("Componentes", componente);
        console.log(result, err);
        if (!err)
            (form as any).lista.list.push(result)
        this.app.hash.remove()
    }
}