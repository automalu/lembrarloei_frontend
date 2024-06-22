import Z from "zeyo";
import App from "../../../app";
import Snackbar from "../../../component/snackbar";
import ComponenteTemplate from "../../../core/entity/ComponenteTemplate";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import CreateComponente from "../controllers/createComponente";

export default class FormCreateHeader extends Form {
    app: App;
    model: ComponenteTemplate;
    lista: any;
    constructor(app: App, model: ComponenteTemplate, lista: any) {
        super(model, "Criando componente Cabecalho", new CreateComponente(app), { back: "Voltar", next: "Criar" })
        this.app = app
        this.model = model
        this.lista = lista
    }

    async getFields(): Promise<Fields> {
        return {
            img: Field.make("file", "Logo", "imagem do logo", this.uploadFile.bind(this))
        }
    }

    async uploadFile(input: HTMLInputElement, element: HTMLInputElement) {
		Snackbar(this.app, Z("p").text("Enviando imagem ⏳"))
		if (!input.files) return console.log("sem arquivo")
		if (input.files && input.files[0].size > 104857600) {
			return console.error("tamanho invalido");
		}
		const data = new FormData()
		data.append("estabelecimento", this.app.session.estabelecimento._id)
		data.append("params", JSON.stringify([{ width: 200, quality: 60 }, { width: 800, quality: 80 }]))
		data.append("element", this.model._id)
		data.append("file", input.files[0])
		console.log(data);
		const request = new XMLHttpRequest();
		request.onreadystatechange = async () => {
			if (request.readyState === 4 && request.status === 200) {
				console.log(request.responseText)
				const [result, err] = JSON.parse(request.responseText)
				if (err) return console.error(result)
				console.log(result)
				Snackbar(this.app, Z("p").text("Imagem Enviada 👍, salvando..."))
				element.value = `https://image.zeyo.org/img/${this.app.session.estabelecimento._id}/q60_w200/${result}`
				/* aqui tem que salvar o url da imagem no banco */
				this.data.img = element.value
				//await new UpdateItem(this.app, "stay").execute(this)
				Snackbar(this.app, Z("p").text("Imagem Salva 😎"))

			} else if (request.status > 300) return
		}
		//request.open("POST", `${server.url}/uploadfile`)
		request.open("POST", `${process.env.SERVER_URL || "https://backend.alasmenu.com"}/uploadfile`)
		/* request.setRequestHeader("accessToken", (await getStorage("accessToken")).value)
		request.setRequestHeader("refreshToken", (await getStorage("refreshToken")).value) */
		request.send(data)
	}
}