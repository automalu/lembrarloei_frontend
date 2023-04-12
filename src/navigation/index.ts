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
        const path = `${(children.next as any).path}/${children.param?.join('/')}`
        console.log(path)
        window.history.pushState({ state: "" }, "", path)
        if (children.param)
            this.state.setParametros(children.param)
        console.log(children.param)
    }

    back() {
        if (this.state.previous && this.state.previous.name !== "root")
            this.state = this.state.previous
    }

    read(path: string[]) {
        if (!path.length) return
        const key = path.shift()
        if (!key || !this.state.childrens[key])
            return console.error(key, "não existe em:", this.state.name)

        const aux = this.state
        this.state = new this.state.childrens[key].next()
        this.state.previous = aux
        this.read(this.state.setParametros(path))
    }
}