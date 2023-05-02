import Form from "../../../form";
import Controller from "../../../interface/controller";

export default class CreateItem extends Controller {
    async execute(form: Form) {
        console.log("entrou no create item");
        console.log(form);
        const [result, err] = await this.app.repository.create("Itens", {
            estabelecimento: this.app.navigation.state.parametros.id,
            titulo: form.data.titulo,
            descricao: form.data.descricao
        });
        if(err) return console.error(result);

        (form as any).lista.list.push(result);
    }
}