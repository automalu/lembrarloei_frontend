import Z, { ZeyoAs } from "zeyo";
import Field from "./field"; 
export default class FieldSemana extends Field {
    dias: { name: string, day: number, horarios: any[], component: ZeyoAs<"div">}[] = [
        { name: "Dom", day: 0, horarios: [], component: Z("div").class("pointer") },
        { name: "Seg", day: 1, horarios: [], component: Z("div").class("pointer") },
        { name: "Ter", day: 2, horarios: [], component: Z("div").class("pointer") },
        { name: "Qua", day: 3, horarios: [], component: Z("div").class("pointer") },
        { name: "Qui", day: 4, horarios: [], component: Z("div").class("pointer") },
        { name: "Sex", day: 5, horarios: [], component: Z("div").class("pointer") },
        { name: "Sab", day: 6, horarios: [], component: Z("div").class("pointer") },
    ]
    constructor(key: string) {
        super(key)
        this.class("d-grid", "gap-p").children(
            Z("div").class("d-flex", "jc-between").children(
                ...this.dias.map(i => i.component.children(
                    Z("h4").text(i.name),
                ))
            ),
        )
    }

    setHorarios() {
        this.dias
        //...i.horarios.map(h => Z("p").text(`${h.inicio} - ${h.fim}`))
    }
    
    getValue(): string {
        return ""
    }

    setValue() {
        return this
    }
}
