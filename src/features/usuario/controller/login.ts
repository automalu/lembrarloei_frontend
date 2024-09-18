import Form from "../../../form"
import Controller from "../../../interface/controller"

export default class Login extends Controller {

    async execute(form: Form) {
        console.log(form, this)
        const result = await this.app.repository.usecase("login", {
            username: form.data.username,
            password: form.data.password,
        })
        console.log(result)
        if (result.jwt) {
            localStorage.setItem("token", result.jwt)
            this.app.navigation.push(new this.app.navigation.state.childrens["u"](this.app), this.app)
        } else alert("Usuario inválido")
    }
}