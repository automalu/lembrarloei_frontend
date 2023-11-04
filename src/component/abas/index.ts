import Z, { Zeyo } from "zeyo";
import Component from "..";
import App from "../../app";
import Aba from "./aba/aba";
import style from "./aba.module.css"
import AbaComponente from "./aba/componente";

export default class Abas extends Component {
    display = Z("div").class(style.display, "d-grid")
    tabs = Z("nav").class(style.abas).clickevent(e => {
        const element = (e.target as HTMLElement)
        if (element.dataset.slide)
            this.changeSlide(this.main.element, element.dataset.slide);
    })
    constructor(app: App) {
        super(app)
    }

    push(aba: Aba | AbaComponente) {
        this.tabs.children(
            Z("a").class(style.aba, aba.selected ? style.selected : "")
                .attribute("data-slide", aba.value)
                .text(aba.titulo)
        )
        this.display.children(
            aba.componente.class(style.slide, aba.selected ? style.active : "", "o-auto", "d-grid").attribute("data-slide", aba.value)
        );
        if(aba.needToCreate)
            (aba as AbaComponente).create()
        return this
    }

    main = Z("section").class("d-grid")
    async create(): Promise<Zeyo> {
        this.clear()
        return this.main.children(
            this.tabs,
            this.display
        )
    };

    changeSlide(parentCategoria: HTMLElement, target?: string): { active: HTMLElement, target: HTMLElement } {
        console.log(parentCategoria, target)
        const nav = (parentCategoria.childNodes[0] as HTMLElement)
        const navNodes = (nav.childNodes as any);
        console.log(navNodes)
        for (const tab of (navNodes as HTMLElement[])) {
            if (tab.dataset.slide === target) {
                tab.classList.add(style.selected)
                nav.scrollTo({
                    top: 0,
                    left: tab.offsetLeft - 10,
                    behavior: "smooth",
                })
            } else if (tab.classList.contains(style.selected))
                tab.classList.remove(style.selected)
        }

        const display = (parentCategoria.childNodes[1].childNodes as any);
        const slides: { active: HTMLElement, target: HTMLElement } = {
            active: ({} as HTMLElement),
            target: ({} as HTMLElement)
        }
        for (const slide of (display as HTMLElement[])) {
            if (slide.dataset.slide === target)
                slides.target = slide
            else if (slide.classList.contains(style.active))
                slides.active = slide

            if (slides.target.tagName)
                slide.classList.remove(style.off)
            else slide.classList.add(style.off)
        }
        slides.active.classList.remove(style.active)
        slides.target.classList.add(style.active)
        return slides
    }
}