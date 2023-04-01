import Controller from "../../../interface/controller";

export default class Singup extends Controller {

    async execute(form: { model: any }) {
        /* const [result, err] = await App.repository.create("publicacoes", form.model)
        if(err) console.error(result);
        else {
            console.log(result);
            form.model.options.forEach(async (o:any) => {
                o.publicacao = result._id
                const option = await App.repository.create("opcoes", o)
                console.log(option);
            });
        } */
        
        console.log(form.model)
    }
}