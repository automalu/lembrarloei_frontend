type StateConstructor = new () => State

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
export default abstract class State {
    abstract title: string
    abstract options: StateOptions
    abstract icons: StateOptions
    abstract previous?: StateConstructor
    set(state: State){
        Object.assign(this, state)
    }
    back(){
        if(this.previous)
            Object.assign(this, new this.previous()) 
    }
    next(option: OptionsState) {
        const state = new option.next()
        Object.assign(this, state)
        console.log(state, option)
    }
    route(option: OptionsRoute) {
        option.param
    }
}