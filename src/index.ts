import App from "./app";
import Login from "./pages/login";
import Usuario from "./states/usuario";
import RepositorySocket from "./repository/socket";
const app = new App()
app.setSocket()
    .setRepository(new RepositorySocket(app.socket))
    .setNavgation({
        [Usuario.path]: {
            title: "User",
            next: Usuario,
        }
    }, Login, app)