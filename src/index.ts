import App from "./app";
import Login from "./pages/login";
import Route from "./router/_route";

const app = new App()
app.setRepository({})
    .setPages(Login)
    .setRouter(new Route(app))