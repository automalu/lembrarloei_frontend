import Z, { ZeyoAs } from "zeyo";
import Card from "../../atoms/card";


export default class CardTitleDescription extends Card {
    title: ZeyoAs<"h3">;
    description: ZeyoAs<"p">;
    constructor() {
        super();
        this.children(
            this.title = Z("h3"),
            this.description = Z("p"),
        )
    }

    setInfo(title: string, description: string){
        this.title.text(title);
        this.description.text(description);
        return this;
    }
}