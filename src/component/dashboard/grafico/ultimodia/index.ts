import Z from "zeyo"
import HTML from "zeyo/src/properties/html"
import App from "../../../../app"
import Card from "../../../card"
import Line from "../Line"

export default class Grafico extends Line {
    app: App
    titulo = Z("h3").text("Picos de Acessos")
    element = Card(this.titulo, this.canvas).class("grafico")
    data: { hour: string; count: number }[] = Array(24).fill(0).map((v, i) => ({ hour: `${i}h`, count: v }));
    
    constructor(app: App) {
        super()
        this.app = app
        this.setData([])
    }

    async setData(elements: any[]) {
        this.chart.data = {labels: ([] as any), datasets: [{label: "Acessos", data: ([] as any)}]}
        this.data = Array(24).fill(0).map((v, i) => ({ hour: `${i}h`, count: v }));
        elements.forEach(element => {
            if (Object.prototype.hasOwnProperty.call(element, "date")) {
                element.date = new Date(element.date)
                this.data[element.date.getHours()].count++
            }
        });
        this.data.forEach(d => {
            this.chart.data.labels?.push(d.hour)
            this.chart.data.datasets.forEach(dataset => dataset.data.push(d.count))
            this.chart.update()
        })
    }
}