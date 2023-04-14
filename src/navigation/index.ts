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
        const path = `${(children.next as any).path}/${children.param?.join('/')}${children.param ? children.param.length ? "/" : "" : ""}`
        console.log(path)
        window.history.pushState({ name: this.state.name }, "", path)
        if (children.param)
            this.state.setParametros(children.param)
        console.log(children.param)
        console.log(this)
    }

    back() {
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

    read(path: string[]) {
        if (!path.length) return
        const key = path.shift()
        if (!key || !this.state.childrens[key])
            return console.error(key, "não existe em:", this.state.name)

        const aux = this.state
        this.state = new this.state.childrens[key].next()
        this.state.previous = aux
        this.read(this.state.setParametros(path))

        this.state
    }
}