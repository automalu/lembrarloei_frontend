import App from "../../../app";
import Form from "../../../form";
import { Field, Fields } from "../../../form/field";
import Modal from "../../../modal";
import CreateItem from "../controllers/createItem";
import FormItemCategoria from "./createcategoria";
import FormItem from "./create";
import FormParceiro from "./createParceiro";

export default class FormSelectTipoItem extends Form {
    app: App
    model: any;
    lista: any;
    constructor(app: App, model: any, lista: any) {
        super(model, "Novo Item", new CreateItem(app), { back: "none", next: "none" })
        this.app = app
        this.model = model
        this.lista = lista
    }
    async getFields(): Promise<Fields> {
        const tipos: {[key: string]: typeof FormItem} = {
            "ingrediente": FormItem,
            "insumo": FormItem,
            "condimento": FormItem,
            "item": FormItem,
            "prato": FormItem,
            "conjunto": FormItem,
            "categoria": FormItemCategoria,
            "parceiro": FormParceiro,
        }
        return {
            "tipos": Field.make("objectv", [
                { value: "ingrediente", name: "Ingrediente" },
                { value: "insumo", name: "Insumo" },
                { value: "condimento", name: "Condimento" },
                { value: "item", name: "Item" },
                { value: "prato", name: "Prato" },
                { value: "conjunto", name: "Conjunto" },
                { value: "categoria", name: "Categoria" },
                { value: "parceiro", name: "Parceiro" },
            ], t => {
                console.log(t)
                Modal.push(new tipos[t.value](this.app, t, this.lista))
            })
        }
    }
}