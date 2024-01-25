import Z, { Zeyo } from "zeyo"
import Component from "../.."
import App from "../../../app"
import { Adapter } from "../../adapter/lib"
import Card from "../../card"

export default class Acesso {
    app: App
    constructor(app: App) {
        this.app = app
    }
    create(hostname: string, component?: any): Zeyo {
        return Card(
            Z("h3").text("Acessos")
        ).object(async o => {
            const [result, err] = await this.app.repository.findMany("Registros", {hostname})
            if(err) return console.error(result);
            
            result.forEach(element => {
                if(Object.prototype.hasOwnProperty.call(element, "date"))
                    element.date = new Date(element.date)
            });
            o.children(Z("p").text(result.length.toString()))
        })
    };
}