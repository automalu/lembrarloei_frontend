import Form from "../../../form";
import Controller from "../../../interface/controller";

export default class CreateItem extends Controller {
    async execute(form: Form) {
        console.log("entrou no create item");
        console.log(form);
        const item = {
            estabelecimento: this.app.session.estabelecimento._id,
            tipo: "item",
            titulo: form.data.titulo,
            descricao: form.data.descricao,
            preco: form.data.preco
        }
        console.log(item)
        const [result, err] = await this.app.repository.create("Itens", item);
        if(err) return console.error(result);

        (form as any).lista.list.push(result);
    }
}