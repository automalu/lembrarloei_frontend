import App from "../app"
import { Children, State, StateConstructor } from "./state"

export default class Navigation {
    state: State
    constructor(state: State) {
        this.state = state
    }

    next(children: Children) {
        const newState = new children.next()
        newState.previous = this.state
        this.state = newState
        const path = `${(children.next as any).path}/${children.param ? children.param.join('/') : ""}${children.param ? children.param.length ? "/" : "" : ""}`
        console.log(path)
        window.history.pushState({ name: this.state.name }, "", path)
        if (children.param)
            this.state.setParametros(children.param)
        console.log(children.param)
        console.log(this)
    }

    back(frompop?: boolean) {
        console.log(window.history.state)
        if(!frompop) return window.history.back()
        if (this.state.previous && this.state.previous.name !== "root") {
            const aux = this.state
            this.state = this.state.previous
            this.state.forward = aux
            if(window.history.state.name === "read"){
                const limit = window.location.pathname.search(`${this.state.forward.name}/`)
                const path = window.location.pathname.substring(0, limit)
                window.history.replaceState({name: this.state.name}, "", path)
            }
        }
    }

    forward() {
        if (this.state.forward)
            this.state = this.state.forward
    }

    async read(path: string[], root: HTMLElement, app: App) {
        if (!path.length) return
        const key = path.shift()
        if (key === "" && !path.length) return
        if (!key || !this.state.childrens[key])
        return console.error(key, "não existe em:", this.state.name)
        
        const aux = this.state
        this.state = new this.state.childrens[key].next()
        this.state.previous = aux
        window.history.pushState({ name: "read" }, "")
        if(this.state.page){
            const page = new this.state.page(app)
            console.log(page)
            root.appendChild((await page.create()).element);
        }

        await this.read(this.state.setParametros(path), root, app)
    }
}