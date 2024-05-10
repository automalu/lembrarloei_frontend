import Z, { Zeyo, ZeyoAs } from "zeyo"
import App from "../app";
import style from "../component/lista.module.css";

export default class ResumoDadosClientes extends ZeyoAs<"div"> {
    app: App
    constructor(app: App) {
        super("div")
        this.app = app
        this.class("d-grid", "gap-m", style.card).object(async (o) => {
            o.children(Z("h3").text("Dados"),
                Z("i").text("Cliente: "),
                Z("i").text("Endereço: "),
                Z("i").text("Pagamento: "))
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