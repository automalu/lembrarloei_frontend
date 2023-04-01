import Z, { Zeyo } from "zeyo";
import Component from "../../../component";
import ComponentForm from "../../../form/components/_component";
import FormState from "../state/_state";
import FormStore from "../state/_store";

export default class LoginContainer extends Component{
    main: Zeyo = Z("div");
    async create(o: {state: FormState}): Promise<Zeyo>{
        return this.main = Z("div").class("form").children(
            await new ComponentForm().create(new o.state.form(this.app, FormStore.model)),
            FormStore.opt.create(o.state.texts).click(() => FormStore.changeState("acao"))
        )
    };
}