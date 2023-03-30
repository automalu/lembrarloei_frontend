import App from "../../app";
//import FormState from "../../features/user/state/_state";
//import FormStore from "../../features/user/state/_store";
import Z, { Zeyo } from "zeyo";
import Component from "../../component";
import ComponentForm from "./_component";

/* 
    TODO: isso deveria estar em componente chamando o formulario tipo o modal porem, um formulario junto do outros componentes
 */
/* export default class Container implements Component{
    main: Zeyo = Z("div");
    async create(o: {state: FormState}): Promise<Zeyo>{
        return this.main = Z("div").children(
            //await new ComponentForm().create(new o.state.form(App.repository, FormStore.model)),
            FormStore.opt.create(o.state.texts)
        )
    };
} */