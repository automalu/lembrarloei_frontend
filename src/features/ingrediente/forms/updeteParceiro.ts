import Z from "zeyo";
import App from "../../../app";
import Snackbar from "../../../component/snackbar";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import Modal from "../../../modal";
import CreatePromocao from "../controllers/createPromocao";
import UpdateItem from "../controllers/update";
import FormHorarios from "./createHorarios";
import FormPromocao from "./createPromocao";
import FormSelectItem from "./selectItem";
import FormUpdatePromocao from "./updatePromocao";

export default class FormUpdateParceiro extends Form {
    app: App
    model: any;
    lista: any[];
    listaSubItens: any[] = []
    constructor(app: App, model: any, lista: any) {
        super(model, model.titulo, new UpdateItem(app), { back: "none", next: "Atualizar" })
        this.app = app
        this.model = model
        this.lista = lista
    }

    async getFields(): Promise<Fields> {
        /* Talvez o melhor seja criar uma colecao para cada tipo que pode possuir um subitem */
        const [subItens, err] = await this.app.repository.findMany("Itens", {
            estabelecimento: this.model.estabelecimento,
            tipo: "promocao",
            restaurante: this.model._id
        })
        console.log(subItens, err)
        this.listaSubItens = []
        subItens.forEach(i => this.listaSubItens.push(new FormUpdatePromocao(this.app, i, this.listaSubItens)))
        this.listaSubItens.push(new FormPromocao(this.app, this.model, subItens))

        const dias: { name: string, day: number, horarios: any[] }[] = [
            { name: "Dom", day: 0, horarios: [] },
            { name: "Seg", day: 1, horarios: [] },
            { name: "Ter", day: 2, horarios: [] },
            { name: "Qua", day: 3, horarios: [] },
            { name: "Qui", day: 4, horarios: [] },
            { name: "Sex", day: 5, horarios: [] },
            { name: "Sab", day: 6, horarios: [] },
        ]
        const [horarios, herr] = await this.app.repository.findMany("Horarios", { estabelecimento: this.model.estabelecimento, restaurante: this.model._id })
        horarios.forEach(h => dias.find(d => d.day === h.dia)?.horarios.push(h))
        return {
            "tipo": Field.make("show", "tipo"),
            "titulo": Field.make("text", "Título", "Nome"),
            "instagram": Field.make("text", "Instagram", "nomeparceiro"),
            "endereco": Field.make("text", "Endereço", "Rua Tal numero 0000"),
            "img": Field.make("file", "Imagem", "https://example.com/image.png", this.uploadFile.bind(this)),
            "horarios": Field.make("semana",
                dias,
                {
                    action: () => {
                        Modal.push(new FormHorarios(this.app, this.model))
                        console.log("apertou no botao")
                    }, text: "Adicionar Horário"
                },
                (d) => {

                    console.log("selecionou dia", d.name)
                },
                "Horários"
            ),
            "filhos": Field.make("objecthimg", "Promoção", this.listaSubItens, adapter => {
                Modal.push(adapter)
            }),
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
        data.append("params", JSON.stringify([{ width: 200, quality: 60 }]))
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
        this.listaSubItens.forEach(async subform => {
            if (subform.novo) return
            const [result, err] = await this.app.repository.delete("Itens", subform.model._id)
            console.log("Deletando Sub Itens", result, err)
        })
        /* Aqui tem que deletar os subelementos */
        const [result, err] = await this.app.repository.delete("Itens", this.model._id)
        console.log(result, err)
        const maped = this.lista.map(i => i._id)
        const index = maped.indexOf(this.model._id)
        if (index > -1) {
            this.lista.splice(index, 1);
        }
        this.app.hash.remove()
    }
}