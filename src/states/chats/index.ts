import App from "../../app"
import Participante from "../../form/components/chat/participante"
import { StateBase } from "../../navigation/state"
import ParametrosGenerico from "../propriedades/parametrosGenerico"
import Childrens from "./childrens"
import Componente from "./componente"

export default class Chats extends Componente(ParametrosGenerico(Childrens(StateBase))) {
    static path = "c"
    previous = undefined
    title = "Chats"
    name = Chats.path
    app: App
    participante: Participante
    constructor(app: App) {
        super()
        this.app = app
        this.participante = new Participante(this.app, this.app.session.client ? this.app.session.client._id : crypto.randomUUID(), true)
    }

    async setup() {
    }
}