import Form from "../../../form";
import Controller from "../../../interface/controller";
import Modal from "../../../modal";
import FormUpdateCategoria from "../forms/updatecategoria";
import FormUpdateParceiro from "../forms/updeteParceiro";

export default class CreateItem extends Controller {
    async execute(form: Form) {
        console.log("entrou no create item");
        console.log(form);
        const item = {
            estabelecimento: this.app.session.estabelecimento._id,
            tipo: form.model.value,
        }
        Object.assign(item, form.data)
        console.log(item)
        const [result, err] = await this.app.repository.create("Itens", item);
        if (err) return console.error(result);

        if ((form as any).list)
            (form as any).lista.list.push(result);
        
        this.app.hash.remove()
        if (item.tipo === "categoria")
            Modal.show(this.app, new FormUpdateCategoria(this.app, result, (form as any).lista))
        else
            Modal.show(this.app, new FormUpdateParceiro(this.app, result, (form as any).lista))
    }
}