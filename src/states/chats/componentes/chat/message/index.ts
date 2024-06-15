import Z, { ZeyoAs } from "zeyo";
import App from "../../../../../app";
import style from "./style.module.css"

export default class Message extends ZeyoAs<"div"> {
    app: App
    constructor(app: App, msg: any) {
        super("div")
        this.app = app
        this.class(style.container).children(
            Z("div").class(style.body).text(msg.text),
            Z("div").class(style.meta).text(msg.time),
            Z("div").class(style.footer).object(async o => o.text(await this.getClient(msg.from))),
        )
    }

    async getClient(clientId: string): Promise<string> {
        const [client, err] = await this.app.repositoryMemory.findOne("Clientes", {_id: clientId})
        return client.nome
    }
}