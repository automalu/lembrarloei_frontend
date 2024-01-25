import Chart from "chart.js/auto"
import Z from "zeyo"

export default class Line {
    canvas = Z("canvas")
    chart = new Chart(this.canvas.element, {type: "line", data: {labels: ([] as any), datasets: [{label: "Acessos", data: ([] as any)}]}})
}