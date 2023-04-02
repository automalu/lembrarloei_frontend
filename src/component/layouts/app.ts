import Z, { Zeyo } from "zeyo";

export default class LayoutApp {
    static slot: Zeyo = Z("main")
    static main: Zeyo = Z("main").class("d-grid").object(e => {
        e.element.style.gridTemplateColumns = "10% auto"
        e.element.style.height = "100vh"
    }).children(
        Z("p").text("Menu"),
        this.slot,
        /* Z("nav").addClass("d-flex", "jc-evenly", "w-100").children(
            new Link().create({text: "H", route:"/"}).addClass("w-100"),
            new Link().create({text: "C", route:"/calendar"}).addClass("w-100"),
            new Link().create({text: "P", route:"/pages"}).addClass("w-100"),
            new Link().create({text: "T", route:"/templates"}).addClass("w-100"),
        ) */
    )
    static inner(z: Zeyo){
        this.slot.element.parentElement?.replaceChild(z.element, this.slot.element);
        this.slot = z
        return this.main
    }
}