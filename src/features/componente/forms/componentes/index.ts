import App from "../../../../app";
import Form from "../../../../form";
import FormListaHorizontal from "./listahorizontal";
export type FormComponente = new (app: App, model: any, lista: any) => Form
export default class FormsComponentes {
    static list: { [key: string]: { name: string; form: FormComponente } } = {
        "listahorizontal": { name: "Lista Horizontal", form: FormListaHorizontal }
    }
}