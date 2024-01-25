import Z from "zeyo"
import App from "../../../../app"
import Card from "../../../card"
import Line from "../Line"

export default class Grafico extends Line {
    app: App
    titulo = Z("h3").text("Picos de Acessos")
    element = Card(this.titulo, this.canvas).class("grafico")
    data: { hour: string; count: number }[] = Array(24).fill(0).map((v, i) => ({ hour: `${i}h`, count: v }));

    constructor(app: App, hostname?: string) {
        super()
        this.app = app
        this.element.object(async o => {
            const hoje = new Date()
            const [result, err] = await this.app.repository.findMany("Registros", { hostname })
            if (err) return console.error(result);
            result.forEach(element => {
                if (Object.prototype.hasOwnProperty.call(element, "date")) {
                    element.date = new Date(element.date)
                    if (element.date.getDate() === hoje.getDate())
                        this.data[element.date.getHours()].count++
                }
            });
            this.data.forEach(d => {
                this.chart.data.labels?.push(d.hour)
                this.chart.data.datasets.forEach(dataset => dataset.data.push(d.count))
                this.chart.update()
            })
        })
    }
}