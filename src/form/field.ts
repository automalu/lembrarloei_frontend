import {ActionFunction, Fields, List, ListMatriz} from "./components/_list";
import { Zeyo } from "zeyo";

export interface Field {
    type: string
    label?: string
    placeholder?: string
    list?: Array<{ value: string; name: string } | any>
    model?: any
    action?: any// tenho que colocar eese => Action
    order?: ActionFunction
    element: Zeyo;
    create(key: string): Zeyo;
    getValue(): any;
    setValue(value: any): void;
}
export class Build {
    //TODO: aqui acredito que de para retornar o objeto do campo selecionado, e o create seria chamado na interface
    static field<T extends keyof List>(type: T, ...params: ListMatriz[T]): List[T] {
        return new Fields.list[type](...params)
    }
}