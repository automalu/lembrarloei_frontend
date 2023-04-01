import Controller from "../../../interface/controller"

export default class Login extends Controller {

    async execute(form: { model: any }) {
        console.log(form.model)
        /* Socket.emit("login", {
            username: post.model.username,
            password: post.model.password,
        })
        const result = await Socket.wait("login")
        if(result) {
            const token = result.jwt
            localStorage.setItem("token", token)
            Socket.emit("settoken", token)
            await Socket.wait("settoken")
            App.route.push("/calendar")
        }else alert("Usuario inválido") */
    }
}