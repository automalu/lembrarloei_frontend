

interface OptionsState {
    type: "state"
    title: string
    next: StateConstructor
}
interface OptionsRoute {
    type: "route"
    title: string
    route: string
    param: object
}
export interface OptionsMap {
    "state": OptionsState
    "route": OptionsRoute
}
export type StateOptions = Array<OptionsState | OptionsRoute>
export type StateConstructor<S = StateBase> = new (...params: any[]) => S
export class StateBase {
    childrens: {[key: string]: any} = {}
}
export default abstract class State {
    abstract title: string
    options: {[key: string]: any} = {}
    abstract icons: StateOptions
    abstract name: string
    abstract previous?: State
    abstract setParametros(route: string[]): string[]
    set(state: State){
        Object.assign(this, state)
    }
    /* back(){
        if(this.previous)
            Object.assign(this, new this.previous()) 
    } */
    next(option: OptionsState) {
        const state = new option.next()
        Object.assign(this, state)
        console.log(state, option)
    }
    route(option: OptionsRoute) {
        option.param
    }
}