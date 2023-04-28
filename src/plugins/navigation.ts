import App from "../app";
import { Watcher } from "../component/watcher";
import Nav from "../navigation";
import { Childrens } from "../navigation/state";
import Root from "../states/_root";
import { ZeyoAppConstructor } from "./lib";

export default function Navigation<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        navigation: Nav = new Nav(new Root({}))
        setNavgation(childrens: Childrens, rootPage: any, app: App) {
            this.navigation = new Proxy<Nav>(new Nav(new Root(childrens, rootPage)), new Watcher(null, "", []));
            window.onpopstate = e => {
                e.preventDefault()
                console.log("entro aqui", window.location.hash, app.hash.on)
                if(window.location.hash) return
                if(app.hash.on) return app.hash.on = false
                if (this.navigation.state.forward && e.state && this.navigation.state.forward.name === e.state.name)
                    this.navigation.forward()
                else this.navigation.back(true)
            }
            const pathname = window.location.pathname.substring(1).split('/')
            if (pathname.length === 1) this.navigation.setPage(app)
            else {
                window.history.replaceState({ name: "root" }, "", "/")
                this.navigation.read(pathname, app)
            }
            return this
        }
    }
}