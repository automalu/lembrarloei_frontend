import Z, { ZeyoAs } from "zeyo";
import CardTitleDescription from "../../molecules/cardTitleDescription";
//import Client from "../../../core/entity/Client";


export default class CardCliente extends CardTitleDescription {
    constructor() {
        super();
    }

    setInfo(client: any): this {
        super.setInfo(client.name, client.number);
        return this;
    }
}