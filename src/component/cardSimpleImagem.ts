import Z, { Zeyo } from "zeyo"
import Component from "."
import App from "../app"
import { Adapter } from "./adapter/lib"
import card from "./card.module.css"

export default class CardSimpleImagem extends Component {
    adapter: Adapter
    fields: { [key: string]: string }
    constructor(app: App, adapter: Adapter) {
        super(app)
        this.adapter = adapter
        this.fields = {
            title: "",
            description: "",
            img: ""
        }
    }
    main: Zeyo = Z("div")
    async create(obj: any): Promise<Zeyo> {
        this.adapter.mapfields.forEach(f => this.fields[f.component] = obj[f.object])
        return this.main = Z("div").class(card.card, card.simples, "d-flex", "gap-m", "pointer").children(
            Z("img").set("src", this.fields.img),
            Z("div").children(
                Z("h3").text(this.fields.title),
                Z("p").text(this.fields.description)
            )
        ).click(() => this.adapter.action(obj))
    };
}