import Z, { ZeyoAs } from "zeyo";
import CardTitleDescription from "../../molecules/cardTitleDescription";


export default class CardEvento extends CardTitleDescription {
    constructor() {
        super();
    }

    setInfo(evento: any): this {
        super.setInfo(evento.name, new Date(evento.date_time).toLocaleString());
        return this;
    }
}