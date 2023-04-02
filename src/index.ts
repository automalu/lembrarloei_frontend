import App from "./app";
import Login from "./pages/login";
import Painel from "./pages/painel";
import Route from "./router/_route";

const app = new App()
app.setRepository({})
    .setPages(Login, Painel)
    .setRouter(new Route(app))