import { Zeyo } from "zeyo"
import App from "../app"
import { Watcher } from "./watcher"
/**
 * comanetario antes da classe
 */
export default abstract class Component {
    app: App
    abstract main: Zeyo
    /**
     * Comentario no construtor
     * @param app 
     */
    constructor(app: App) {
        this.app = app
    }
    abstract create(obj?: any): Promise<Zeyo>
    watch<O>(obj: O): [O, this] {
        const newComponent = new Proxy(this, {
            set: (target, key, value) => {
                if (key === "main")
                    target.main.element.parentElement?.replaceChild(value.element, target.main.element);
                target[key as keyof typeof target] = value
                return true
            }
        })
        return [new Proxy(obj, new Watcher(null, "", newComponent)), newComponent]
    }
}