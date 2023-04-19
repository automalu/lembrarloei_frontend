import App from "../app"
import Hash from "../router/hash/_hash"
import { Children, State, StateConstructor } from "./state"

export default class Navigation extends Hash {
    state: State
    constructor(state: State) {
        super()
        this.state = state
    }

    async next(children: Children, app: App) {
        const newState = new children.next(app)
        newState.previous = this.state
        this.state = newState
        const path = `${(children.next as any).path}/${children.param ? children.param.join('/') : ""}${children.param ? children.param.length ? "/" : "" : ""}`
        window.history.pushState({ name: this.state.name }, "", path)
        if (children.param)
            this.state.setParametros(children.param)

        await this.setPage(app)
    }

    back(frompop?: boolean) {
        if (!frompop) return window.history.back()
        if (this.state.previous && this.state.previous.name !== "root") {
            const aux = this.state
            this.state = this.state.previous
            this.state.forward = aux
        }
    }

    forward() {
        if (this.state.forward)
            this.state = this.state.forward
    }

    async read(path: string[], app: App) {
        if (!path.length) return true
        const key = path.shift()
        if (key === "" && !path.length) return
        if (!key || !this.state.childrens[key])
            return console.error(key, "não existe em:", this.state.name)

        const aux = this.state
        this.state = new this.state.childrens[key].next()
        this.state.previous = aux
        await this.setPage(app)
        path = this.state.setParametros(path)
        const param = Object.values(this.state.parametros)
        const pathname = `${this.state.name}/${param ? param.join('/') : ""}${param ? param.length ? "/" : "" : ""}`
        if (window.location.pathname === "/")
            window.history.replaceState({ name: this.state.name }, "", pathname)
        else
            window.history.pushState({ name: this.state.name }, "", pathname)
        await this.read(path, app)
    }

    async setPage(app: App) {
        if (this.state.page) {
            const page = new this.state.page(app)
            app.root.innerHTML = ""
            app.root.appendChild((await page.create()).element);
        }
    }
}