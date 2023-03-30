import App from "./app";
import Root from "./pages/root";
import Route from "./router/_route";

const app = new App()
app.setRepository({})
    .setPages(Root)
    .setRouter(new Route(app))