import App from "../app";
import Form from "../form/";
import { Zeyo } from "zeyo";
import Component from "../component";
import Bottom from "./bottom";

interface Node {
    form: Form
    pre?: Node
}
export default class Modal {
    static element: Zeyo
    static modal: Component
    static node: Node
    static async show(app: App, form: Form){
        this.modal = new Bottom(app)
        app.router.hash.push("modal")
        this.node = {form}
        this.element = await this.modal.create(form)
        app.root.appendChild(this.element.element)

        app.router.hash.cb = () => {
            this.modal.main.element.remove()
        }
    }

    static async change(form: Form, node: Node){
        const novo = await this.modal.create(form)
        this.element.element.parentElement?.replaceChild(novo.element, this.element.element)
        this.element = novo
        this.node = node
    }

    static async push(form: Form){
        await this.change(form, {form, pre: this.node})
    }

    static async back(){
        if(this.node.pre)
            await this.change(this.node.pre.form, this.node.pre)
    }
}