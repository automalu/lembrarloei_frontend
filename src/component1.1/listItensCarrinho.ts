import Z, { Zeyo, ZeyoAs } from "zeyo"
import App from "../app";
import style from "../component/lista.module.css";

export default class ListItensCarrinho extends ZeyoAs<"div"> {
    app: App
    constructor(app: App, carrinhoid: string) {
        super("div")
        this.app = app
        this.class("d-flex", "gap-m", style.card).object(async (o) => {
            const [carrinho, err] = await this.app.repositoryMemory.findOne("Carrinhos", { _id: carrinhoid })
            if (err) return console.error(carrinho);
            
            const [itens, ierr] = await this.app.repositoryMemory.findMany("ItensCarrinho", {carrinho: carrinho._id})
            console.log("Itens selecionados ===> 👉", itens.length)
            itens.forEach(i => this.putItem(i))
            app.repositoryMemory.createTriggerTo("ItensCarrinho", async (value: any) => {
                if(value.carrinho === carrinho._id)
                this.putItem(value)
            }, "create")
        })
    }

    putItem(value: any) {
        this.children(
            Z("img").object(async o => {
                o.element.style.width = "35px"
                o.element.style.height = "35px"
                const [item, err] = await this.app.repository.findOne("Itens", { _id: value.item, estabelecimento: "65d78d44df7f05c032258b24" })
                //this.calcCheckout(item.preco)
                o.set("src", item.img),
                this.app.repositoryMemory.createTriggerTo("ItensCarrinho", (dvalue) => {
                    if (dvalue === value._id) {
                        //this.calcCheckout(`-${item.preco}`)
                        o.element.remove()
                    }
                }, "delete")
            })
        )
    }
}