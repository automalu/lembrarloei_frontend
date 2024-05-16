import App from "./app";
import Login from "./pages/login";
import Usuario from "./states/usuario";
import RepositorySocket from "./repository/socket";
const app = new App()
app.setSocket()
    .setRepository(new RepositorySocket(app.socket))
    .setNavgation({
        [Usuario.path]: Usuario,
    }, Login, app)

app.socket.onAny((event, msg) => {
    if (event === "repositorysync") {
        console.log(msg)
        app.repositoryMemory.methodsMap[msg.type](msg.collection, msg.value, "repositorysync")
    }
})

window.addEventListener("load", async () => {
    app.repositoryMemory.createTriggerTo("all", (collection, value, type, ti, origin) => {
        console.log("Enviando ao servidor 👉", collection, value, type, ti)
        if(origin === "repositorysync") return 
        const data = {collection, value, type}
		app.socket.emit("repositorysync", data)
    }, "create", "update", "delete")
})