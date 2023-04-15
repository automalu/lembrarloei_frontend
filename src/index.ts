import App from "./app";
import Login from "./pages/login";
import Usuario from "./states/usuario";

const app = new App()
app.setRepository({})
    .setNavgation({
        [Usuario.path]: {
            title: "User",
            next: Usuario,
        }
    },Login, app)