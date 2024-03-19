import Z, { Zeyo } from 'zeyo';
import Snackbar from '../../../component/snackbar';
import Text from '../../../component/text';
import WaitText from '../../../component/text/waitText';
import Form from '../../../form';
import Controller from '../../../interface/controller';
import Modal from '../../../modal';
import style from '../../../modal/modal.module.css';

export default class CreateRegras extends Controller {
    async execute(form: Form) {
        console.log('entrou no create regras');
        console.log(form);
        const regra = Object.assign({
            parent: form.model._id
        }, form.data)
        console.log(regra);
        Modal.setMessage(WaitText("h2", "Criando Regra"))
        const [result, err] = await this.app.repository.create("Regras", regra)
        console.log(result, err)
        Modal.back()
        Snackbar(this.app, Text('h3', "Criado com sucesso 😎"))
    }
}
