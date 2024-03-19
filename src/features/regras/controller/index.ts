import Z, { Zeyo } from 'zeyo';
import WaitText from '../../../component/waitText';
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
        let interval
        (Modal.element.childList[0] as Zeyo).HTML("").class(style["center"]).children(
            WaitText("h2", "Criando Regra")
        )
        await new Promise(res => {
            setTimeout(() => {
                res(true)
            }, 3000);
        })
        clearInterval(interval)
        Modal.back()
    }
}
