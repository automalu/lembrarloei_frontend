import Z from "zeyo";
import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import UpdateItem from "../controllers/update";
import FormCreateSabor from "./createSabor";
import FormSelectCategoria from "./selectCategoria";
import FormUpdateSabor from "./updateSabor";
import Snackbar from "../../../component/snackbar";

export default class FormUpdateItem extends Form {
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
            "ingredientes": Field.make("objecth", "Ingredientes", []),
            "sabores": Field.make("objecth", "Sabores", [new FormCreateSabor(this.app, {item: this.model._id, tipo: "sabor"}, [])]),
            "img": Field.make("file", "Imagem Principal", "https://example.com/image.png", this.uploadFile.bind(this)),
            "categorias": Field.make("objecth", "Categorias", [new FormSelectCategoria(this.app, this.model, [])]).object(async f => {
				const [result, err] = await this.app.repository.findMany("ParentsItem", {
					estabelecimento: this.model.estabelecimento,
					subitem: this.model._id
				})
				if (err) return
				const lista: any[] = []
				result.forEach(i => lista.push(new FormUpdateItem(this.app, i, lista)))
				lista.push(new FormSelectCategoria(this.app, this.model, lista))
				f.element.HTML("").children(...Field.make("objecth", "Categorias", lista).create().childList)
			})
        };
        (async () => {
            const [result, err] = await this.app.repository.findMany("Itens", {
                estabelecimento: this.app.session.estabelecimento._id,
                tipo: "sabor",
                item: this.model._id
            })
            if(err) return

            const list: any[] = [];
            result.forEach(r => list.push(new FormUpdateSabor(this.app, r, [])));
            list.push(new FormCreateSabor(this.app, {item: this.model._id, tipo: "sabor"}, []));

            fields["sabores"].element.HTML("").children(...Field.make("objecth", "Sabores", list).create().childList)
        })();
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