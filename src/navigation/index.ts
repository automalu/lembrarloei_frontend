import { Watcher } from "../component/watcher";

export interface State {
    childrens: {[key: string]: any};
    setParametros(route: string[]): string[]
    previous?: State
    name: string
    title: string
}
export default class Navigation {
    state: State
    constructor(state: State) {
        this.state = new Proxy(state, new Watcher(null, "", []))
    }

    read(path: string[]) {
        if(!path.length) return
        const key = path.shift()
        if(!key || !this.state.childrens[key]) 
        return console.error(key, "não existe em:", this.state.name)
        
        const aux = this.state
        this.state = new Proxy(new this.state.childrens[key].next(), new Watcher(null, "", []))
        this.state.previous = aux
        this.read(this.state.setParametros(path))
    }
}