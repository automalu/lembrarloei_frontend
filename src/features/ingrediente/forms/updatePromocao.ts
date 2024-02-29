import Z from "zeyo";
import App from "../../../app";
import Snackbar from "../../../component/snackbar";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import Modal from "../../../modal";
import UpdateItem from "../controllers/update";
import FormSelectCategoria from "./selectCategoria";
import FormCreateImagem from "../../imagem/forms/create";
import FormUpdateImagem from "../../imagem/forms/update";
import ObjectHImg from "../../../form/components/objecthimg";

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
		return {
			"titulo": Field.make("text", "Nome", "Texto"),
			"descricao": Field.make("text", "Descrição", "Texto"),
			"preco": Field.make("text", "Preço", "30,00"),
			"img": Field.make("file", "Imagem", "https://example.com/image.png", this.uploadFile.bind(this)),
			"imgs": Field.make("objecthimg", "Imagens", [new FormCreateImagem(this.app, this.model, [])]).object(async f => {
				async function getImagens(field: ObjectHImg, app: App, model: any) {
					const [result, err] = await app.repository.findMany("Imagens", {
						estabelecimento: app.session.estabelecimento._id,
						parent: model._id
					})
					if (err) return;
					const list: any[] = result.map(r => new FormUpdateImagem(app, r, result))
					list.push(new FormCreateImagem(app, model, result))
					field.element.HTML("").children(...Field.make("objecthimg", "Imagens", list, async (a) => {
						if (!a.novo) return Modal.push(a)
						await a.controller.execute(a)
						getImagens(field, app, model)
					}).create().childList);
				};
				getImagens(f, this.app, this.model)
				f.action = async (a) => {
					await a.controller.execute(a)
					getImagens(f, this.app, this.model)
				}
			}),
			"link": Field.make("text", "Link", "https://parceiro.com/link-para-promocao"),
			"url": Field.make("show", "URL"),
			"categorias": Field.make("objecth", "Categorias", [new FormSelectCategoria(this.app, this.model, [])]).object(async f => {
				const [result, err] = await this.app.repository.findMany("ParentsItem", {
					estabelecimento: this.model.estabelecimento,
					subitem: this.model._id
				})
				if (err) return
				const lista: any[] = []
				result.forEach(i => lista.push(new FormUpdatePromocao(this.app, i, lista)))
				lista.push(new FormSelectCategoria(this.app, this.model, lista))
				f.element.HTML("").children(...Field.make("objecth", "Categorias", lista).create().childList)
			})
		}
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
				await new UpdateItem(this.app, "stay").execute(this)
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
		/* Aqui tem que deletar os subelementos 
			como as imagens
		*/
		const [mresult, merr] = await this.app.repository.deleteMany("Imagens", {
			estabelecimento: this.app.session.estabelecimento._id,
			parent: this.model._id
		})
		console.log(mresult, merr)
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