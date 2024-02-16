import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import Modal from "../../../modal";
import UpdateItem from "../controllers/update";
import FormSelectCategoria from "./selectCategoria";

export default class FormUpdatePromocao extends Form {
	model: any;
	parceiro: any;
	lista: any[];
	name = ""
	img = ""
	app: App
	constructor(app: App, model: any, lista: any) {
		super(model, model.titulo, new UpdateItem(app, true), { back: "Voltar", next: "Atualizar" })
		this.app = app
		this.model = model
		this.name = model.titulo
		this.img = model.img
		this.lista = lista
	}
	async getFields(): Promise<Fields> {
		const fields: Fields = {
			"titulo": Field.make("text", "Nome", "Texto"),
			"descricao": Field.make("text", "Descrição", "Texto"),
			"preco": Field.make("text", "Preço", "30,00"),
			"img": Field.make("file", "Imagem", "https://example.com/image.png", this.uploadFile.bind(this)),
			"link": Field.make("text", "Link", "https://parceiro.com/link-para-promocao"),
			"url": Field.make("show", "URL"),
		}
		const [result, err] = await this.app.repository.findMany("ParentsItem", {
			estabelecimento: this.model.estabelecimento,
			subitem: this.model._id
		})
		if (err) {
			console.error(result);
			return fields
		}
		const lista: any[] = []
		result.forEach(i => lista.push(new FormUpdatePromocao(this.app, i, lista)))
		lista.push(new FormSelectCategoria(this.app, this.model, lista))
		fields["categoria"] = Field.make("objecth", "Categorias", lista)
		return fields
	}

	async uploadFile(input: HTMLInputElement, element: HTMLInputElement) {
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
		request.onreadystatechange = () => {
			if (request.readyState === 4 && request.status === 200) {
				console.log(request.responseText)
				const [result, err] = JSON.parse(request.responseText)
				if (err) return console.error(result)
				console.log(result)
				element.value = `https://image.zeyo.org/img/${this.model.estabelecimento}/q60_w200/${result}`
			} else if (request.status > 300) return
		}
		//request.open("POST", `${server.url}/uploadfile`)
		request.open("POST", `http://backend.alasmenu.com/uploadfile`)
		/* request.setRequestHeader("accessToken", (await getStorage("accessToken")).value)
		request.setRequestHeader("refreshToken", (await getStorage("refreshToken")).value) */
		request.send(data)
	}

	delete = true
	async onDelete(): Promise<void> {
        console.log(this.model, this.lista);
        /* Aqui tem que deletar os subelementos */
        const [result, err] = await this.app.repository.delete("Itens", this.model._id)
        console.log(result, err)
        const maped = this.lista.map(i => i._id)
        const index = maped.indexOf(this.model._id)
        if (index > -1) {
            this.lista.splice(index, 1);
        }
        Modal.back()
    }
}