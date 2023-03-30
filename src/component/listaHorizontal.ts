import Z, { Zeyo } from "zeyo";
import Component from ".";
import App from "../app";
import CardSimple from "./cardSimple";

export default class ListaHorizontal extends Component {
    main: Zeyo = Z("div");
    card: typeof CardSimple
    constructor(app: App, card: typeof CardSimple){
        super(app)
        this.card = card
    }
    async create(obj: {adapter: any, title: string, list: {title: string, description: string}[]}): Promise<Zeyo> {
        return this.main = Z("div").children(
            Z("h2").text(obj.title),
            ...(await Promise.all(obj.list.map(async e => {
                const [es, c] = new this.card(this.app, obj.adapter).watch(e);
                return await c.create(es)
            })))
        )
    }
}