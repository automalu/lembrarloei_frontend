import App from "../../../../app";
import Form from "../../../../form";
import FormListaHorizontalSelectAdapter from "../../listahorizontal/forms/selectadapter";
import FormSelectItem from "../selectItem";
export type FormComponente = new (app: App, model: any, lista: any) => Form
export default class FormsComponentes {
    static list: { [key: string]: { name: string; form: FormComponente } } = {
        "listahorizontal": { name: "Lista Horizontal", form: FormListaHorizontalSelectAdapter },
        "cardprecosimple": { name: "Card Preço Simples", form: FormSelectItem }
    }
}