import Form from "../../../form";
import Controller from "../../../interface/controller";
import Modal from "../../../modal";
import FormUpdateParceiro from "../forms/updeteParceiro";

export default class CreateHorarios extends Controller {
    async execute(form: Form) {
        console.log("entrou no create item");
        console.log(form);
        form.data.dias.forEach(async (checked: boolean, dia: number) => {
            if(checked) {
                const horario = {
                    inicio: form.data.inicio,
                    fim: form.data.fim,
                    restaurante: form.model._id,
                    estabelecimento: form.model.estabelecimento,
                    dia
                }
                const [result, err] = await this.app.repository.create("Horarios", horario)
                console.log(result, err)
            }
        });
        Modal.back()
    }
}