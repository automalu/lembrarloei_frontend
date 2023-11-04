import { Zeyo } from "zeyo";
import Component from "../..";

export default abstract class AbaComponente extends Component{
    needToCreate = true
    abstract create(obj?: any): Zeyo | Promise<Zeyo> 
    selected: boolean = false;
    abstract value: string;
    abstract titulo: string;
    abstract componente: Zeyo;
}