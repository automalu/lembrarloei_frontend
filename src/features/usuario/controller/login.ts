import Form from "../../../form"
import Controller from "../../../interface/controller"

export default class Login extends Controller {

    async execute(form: Form) {
        console.log(form)
        this.app.socket.emit("login", {
            username: form.data.username,
            password: form.data.password,
        })
        const [result, err] = await this.app.socket.wait("login")
        console.log(result, err)
        if (!err && result) {
            const accessToken = result.accessToken
            const refreshToken = result.refreshToken
            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", refreshToken)
            this.app.navigation.next(this.app.navigation.state.childrens["u"], this.app)
        } else alert("Usuario inválido")
    }
}