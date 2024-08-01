import Z, { Zeyo } from "zeyo";
import App from "../../../app";
import WaitText from "../../../component/text/waitText";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import FormCreateRegras from "../../regras/form";
import FormUpdateRegras from "../../regras/form/update";
import UpdateItem from "../controllers/update";
import FormSelectItem from "./selectItem";
import FormUpdateSubItem from "./updateSubItem";
import FormSelectCategoria from "./selectCategoria";
import Snackbar from "../../../component/snackbar";

export default class FormUpdateConjunto extends Form {
    model: any;
    lista: any;
    app: App;
    constructor(app: App, model: any, lista: any) {
        super(model, model.titulo, new UpdateItem(app), {back: "none", next: "Atualizar"})
        this.app = app
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        const fields: Fields = {
            "tipo": Field.make("show", "tipo"),
            "titulo": Field.make("text", "Título", "Texto"),
            "descricao": Field.make("text", "Descrição", "Texto"),
            "preco": Field.make("text", "Preço", "30,00"),
            "img": Field.make("file", "Imagem Principal", "https://example.com/image.png", this.uploadFile.bind(this)),
            "itens": Field.make("objecth", "Itens", [new FormSelectItem(this.app, {}, [])]).object(async f => {
                const [result, err] = await this.app.repository.findMany("SubItens", {
                    estabelecimento: this.model.estabelecimento,
                    parent: this.model._id
                })
                const lista: any[] = []
				result.forEach(i => lista.push(new FormUpdateSubItem(this.app, i, [])))
				lista.push(new FormSelectItem(this.app, this.model, []))
                f.element.HTML("").children(...Field.make("objecth", "Itens", lista).create().childList)
            }),
            "regras": Field.make("objecth", "Regras", [new FormCreateRegras(this.app, this.model)]).object(async f => {
                const [result, err] = await this.app.repository.findMany("Regras", {
                    estabelecimento: this.model.estabelecimento,
                    parent: this.model._id
                })
                const lista: any[] = []
				result.forEach(i => lista.push(new FormUpdateRegras(this.app, i)))
				lista.push(new FormCreateRegras(this.app, this.model))
                f.element.HTML("").children(...Field.make("objecth", "Regras", lista).create().childList)
            }),
            "categorias": Field.make("objecth", "Categorias", [new FormSelectCategoria(this.app, this.model, [])]).object(async f => {
				const [result, err] = await this.app.repository.findMany("ParentsItem", {
					estabelecimento: this.model.estabelecimento,
					subitem: this.model._id
				})
				if (err) return
				const lista: any[] = []
				result.forEach(i => lista.push(new FormUpdateConjunto(this.app, i, lista)))
				lista.push(new FormSelectCategoria(this.app, this.model, lista))
				f.element.HTML("").children(...Field.make("objecth", "Categorias", lista).create().childList)
			})
        };
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
				await new UpdateItem(this.app, "stay").execute(this)
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