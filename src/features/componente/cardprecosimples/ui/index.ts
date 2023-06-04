import Z, { Zeyo } from "zeyo";
import App from "../../../../app";
import Component from "../../../../component";
import painel from "../../../../component/painel/painel.module.css";

export default class CardPrecoSimple extends Component{
    main: Zeyo = Z("div");
    constructor(app: App) {
        super(app)
    }
    create(component: any): Zeyo {
        return this.main = Z("h3").text(component.titulo)
    }
}