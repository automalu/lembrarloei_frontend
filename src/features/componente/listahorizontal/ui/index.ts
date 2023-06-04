import Z, { Zeyo } from "zeyo";
import App from "../../../../app";
import Component from "../../../../component";
import painel from "../../../../component/painel/painel.module.css";
import CardPrecoSimple from "../../cardprecosimples/ui";
type ConstructorComponent = new (app: App) => Component;
export default class ListaHorizontal extends Component{
    main: Zeyo = Z("div");
    components: { [key: string]: ConstructorComponent } = {
        "cardprecosimple": CardPrecoSimple,
        //"carddestaque": { name: "Card Destaque", form: FormSelectItem },
    }
    constructor(app: App) {
        super(app)
    }
    async create(component: any): Promise<Zeyo> {
        console.log(component.titulo);

        (async () => {
            const [result, err] = await this.app.repository.findMany("SubItem", {
                estabelecimento: this.app.session.estabelecimento._id,
                parent: component.item
            });
            console.log(result, err)
            console.log("\n\n👉👆", component.titulo)
            this.main.element.innerHTML = Z("div").class(painel["column-full"], painel["row-five"], "d-flex").children(
                Z("h2").text(component.titulo),
                ...(await Promise.all(result.map(async e => {
                    const [es, c] = new this.components[component.sub.tipo](this.app).watch(e.item);
                    return await c.create(es)
                })))
            ).element.innerHTML;
        })();

        return this.main = Z("div").class(painel["column-full"], painel["row-five"]).children(
            Z("h2").text(component.titulo),
        )
    }
}