import { Zeyo } from "zeyo";

export default class Aba {
    value: string
    titulo: string;
    componente: Zeyo;
    selected = false
    needToCreate = false
    constructor(value: string, titulo: string, componente: Zeyo, selected?: boolean) {
        this.value = value
        this.titulo = titulo
        this.componente = componente
        this.selected = selected ? true : false
    }
}