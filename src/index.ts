import App from "./app";
import Login from "./pages/login";
import Painel from "./pages/painel";
import Route from "./router/_route";
import Usuario from "./states/usuario";

const app = new App()
app.setRepository({})
    .setNavgation({
        [Usuario.path]: {
            title: "User",
            next: Usuario,
        }
    }, app)
    /* .setPages(Login, Painel)
    .setRouter(new Route(app)) */