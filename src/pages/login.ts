import User from "../features/usuario/domain/entity/user";
import StateLogin from "../features/usuario/state/login";
import FormStore from "../features/usuario/state/_store";
import Z from "zeyo";
import Page from ".";
import LoginContainer from "../features/usuario/ui/loginContainer";
import login from "../features/usuario/ui/login.module.css";

export default class Login extends Page {
    route: string = "/";
    title?: string;
    children?: Node[];
    auth?: string;
    params?: { [key: string]: string; };
    main = Z("main");
    async create() {
        FormStore.model = new User()
        const [state, form] = new LoginContainer(this.app).watch({ state: new StateLogin() })
        FormStore.obj = state
        return Z("main").class("d-grid", login.login).children(
            Z("div").class("d-grid", "jc-center", "ac-center", "h-100", login.complement).children(
                Z("h2").text("Bem-Vindo"),
                Z("h1").HTML("Vamos<br>Começar")
            ),
            Z("div").class("d-grid", "gap-m", "jc-center", "h-100", login.area)
                .children(
                    await form.create(state),
                )
        )
    }
}