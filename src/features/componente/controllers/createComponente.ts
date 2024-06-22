import Form from "../../../form";
import Controller from "../../../interface/controller";

export default class CreateComponente extends Controller {
    async execute(form: Form): Promise<void> {
        console.log(form)
        /* Todo: aqui vai ter que chamar um usecase para cada componente */
        const componente: any = {
            titulo: form.model.item ? form.model.item.titulo: form.model.titulo,
            tipo: form.model.template ? form.model.template.tipo: form.model.tipo,
            estabelecimento: this.app.session.estabelecimento._id,
            item: form.model.item ? form.model.item._id : form.model._id,
            adapter: form.data
        }
        console.log(componente)
        if(componente.tipo === "abas") {
            componente.adapter = {
                "tipo": "categoria"
            }
            componente.sub = {
                "tipo": "cardproduto",
                "action": {
                    "tipo": "modal",
                    "adapter": {
                        "tipo": "component",
                        "modal": "modalproduto"
                    }
                },
                "adapter": {
                    "img": "img",
                    "nome": "titulo",
                    "preco": "preco",
                    "descricao": "descricao",
                    "restaurante": "restaurante"
                }
            }
        }else if(componente.tipo === "titulo") {
            componente.img = form.data.img
            delete componente.adapter
        }
        const [result, err] = await this.app.repository.create("Componentes", componente);
        console.log(result, err);
        if (!err && (form as any).lista.list)
            (form as any).lista.list.push(result)
        this.app.hash.remove()
    }
}