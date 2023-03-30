import Z, { Zeyo } from "zeyo"
import Component from "."
import App from "../app"

export default class CardSimple extends Component {
    adapter: string
    fields: { [key: string]: string }
    constructor(app: App, adapter: string) {
        super(app)
        this.adapter = adapter
        this.fields = {
            title: "",
            description: "",
        }
    }
    main: Zeyo = Z("div")
    async create(obj: any): Promise<Zeyo> {
        /* const adapter = Adapters.list[this.adapter]
        adapter.mapfield.forEach(f => this.fields[f.component] = obj[f.object]) */
        return this.main = Z("div").children(
            Z("h3").text(obj.title),
            Z("p").text(obj.description)
        )
    };
}