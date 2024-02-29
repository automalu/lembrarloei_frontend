import Z from "zeyo";
import App from "../../../app";
import Snackbar from "../../../component/snackbar";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import Modal from "../../../modal";
import UpdateImagem from "../controllers/update";

export default class FormUpdateImagem extends Form {
	model: any;
	parceiro: any;
	lista: any[];
	img = ""
	app: App
	constructor(app: App, model: any, lista: any) {
		super(model, model.titulo, new UpdateImagem(app), { back: "Voltar", next: "none" })
		this.app = app
		this.model = model
		this.img = model.img
		this.lista = lista
	}
	async getFields(): Promise<Fields> {
		const fields: Fields = {
			"img": Field.make("file", "Imagem", "https://example.com/image.png", this.uploadFile.bind(this)),
		}
		return fields
	}

	async uploadFile(input: HTMLInputElement, element: HTMLInputElement) {
		Snackbar(this.app, Z("p").text("Enviando imagem ⏳"))
		if (!input.files) return console.log("sem arquivo")
		if (input.files && input.files[0].size > 104857600) {
			return console.error("tamanho invalido");
		}
		const data = new FormData()
		data.append("estabelecimento", this.model.estabelecimento)
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
				element.value = `https://image.zeyo.org/img/${this.model.estabelecimento}/q60_w200/${result}`
				/* aqui tem que salvar o url da imagem no banco */
				this.data.img = element.value
				await this.controller.execute(this)
				Snackbar(this.app, Z("p").text("Imagem Salva 😎"))

			} else if (request.status > 300) return
		}
		//request.open("POST", `${server.url}/uploadfile`)
		//request.open("POST", `http://localhost:8080/uploadfile`)
		request.open("POST", `https://backend.alasmenu.com/uploadfile`)
		/* request.setRequestHeader("accessToken", (await getStorage("accessToken")).value)
		request.setRequestHeader("refreshToken", (await getStorage("refreshToken")).value) */
		request.send(data)
	}

	delete = true
	async onDelete(): Promise<void> {
		console.log(this.model, this.lista);
		/* Aqui tem que deletar os subelementos */
		const [result, err] = await this.app.repository.delete("Imagens", this.model._id)
		console.log(result, err)
		
		Modal.back()
	}
}