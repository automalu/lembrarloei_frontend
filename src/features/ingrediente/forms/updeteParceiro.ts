import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import Modal from "../../../modal";
import UpdateItem from "../controllers/update";
import FormPromocao from "./createPromocao";
import FormSelectItem from "./selectItem";
import FormUpdatePromocao from "./updatePromocao";

export default class FormUpdateParceiro extends Form {
    app: App
    model: any;
    lista: any;
    constructor(app: App, model: any, lista: any) {
        super(model, model.titulo, new UpdateItem(app), { back: "none", next: "Atualizar" })
        this.app = app
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        /* Talvez o melhor seja criar uma colecao para cada tipo que pode possuir um subitem */
        const [listaSubItens, err] = await this.app.repository.findMany("Itens", {
            estabelecimento: this.model.estabelecimento,
            tipo: "promocao",
            restaurante: this.model._id
        })
        console.log(listaSubItens, err)
        const lista: any[] = []
        listaSubItens.forEach(i => lista.push(new FormUpdatePromocao(this.app, i, lista)))
        lista.push(new FormPromocao(this.app, this.model, listaSubItens))
        return {
            "tipo": Field.make("show", "tipo"),
            "titulo": Field.make("text", "Título", "Nome"),
            "instagram": Field.make("text", "Instagram", "nomeparceiro"),
            "endereco": Field.make("text", "Endereço", "Rua Tal numero 0000"),
            "img": Field.make("text", "Imagem", "https://example.com/image.png"),
            "horarios": Field.make("semana",
                [
                    { name: "Dom" },
                    { name: "Seg" },
                    { name: "Ter" },
                    { name: "Qua" },
                    { name: "Qui" },
                    { name: "Sex" },
                    { name: "Sab" },
                ],
                { action: () => { console.log("apertou no botao") }, text: "Adicionar Horario" },
                () => console.log("selecionou dia"),
                "Horários"
            ),
            "filhos": Field.make("objecth", "Promoção", lista, adapter => {
                console.log(adapter)
                Modal.push(adapter)
            }),
        }
    }
}