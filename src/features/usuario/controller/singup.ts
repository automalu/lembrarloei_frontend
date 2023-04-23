import Controller from "../../../interface/controller";
import Form from "../../../form"

export default class Singup extends Controller {

    async execute(form: Form) {
        console.log(form)
        this.app.socket.emit("createuser", form.data)
        const [result, err] = await this.app.socket.wait("createuser")
        console.log(result, err)
    }
}