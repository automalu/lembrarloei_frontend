

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
export interface State {
    childrens: {[key: string]: any};
    setParametros(route: string[]): string[]
    previous?: State
    forward?: State
    name: string
    title: string
}
export type StateConstructor<S = State> = new () => S

export type StateBaseConstructor<S = StateBase> = new (...params: any[]) => S
export interface Children {
    title: string;
    next: StateConstructor;
    param?: string[];
}
export type Childrens = {[key: string]: Children}
export class StateBase {
    childrens: Childrens = {}
}