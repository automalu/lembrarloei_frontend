import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import Modal from "../../../modal";
import UpdateItem from "../controllers/update";
import FormHorarios from "./createHorarios";
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
                    { name: "Dom", day: 0 },
                    { name: "Seg", day: 1 },
                    { name: "Ter", day: 2 },
                    { name: "Qua", day: 3 },
                    { name: "Qui", day: 4 },
                    { name: "Sex", day: 5 },
                    { name: "Sab", day: 6 },
                ],
                { action: () => { 
                    Modal.push(new FormHorarios(this.app, this.model))
                    console.log("apertou no botao") 
                }, text: "Adicionar Horario" },
                (d) => {

                    console.log("selecionou dia", d.name)
                },
                "Horários"
            ),
            "filhos": Field.make("objecth", "Promoção", lista, adapter => {
                console.log(adapter)
                Modal.push(adapter)
            }),
        }
    }
}