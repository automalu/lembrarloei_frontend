import Controller from "../../../interface/controller";

export default class Esqueci extends Controller {
    async execute(form: { model: any }) {
        /* const [result, err] = await App.repository.create("publicacoes", post.model)
        if(err) console.error(result);
        else {
            console.log(result);
            post.model.options.forEach(async (o:any) => {
                o.publicacao = result._id
                const option = await App.repository.create("opcoes", o)
                console.log(option);
            });
        } */
        console.log(form.model)
    }
}