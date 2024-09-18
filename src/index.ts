import App from "./app";
import Login from "./pages/login";
import Usuario from "./states/usuario";
import RepositoryApiSQL from "./repository/apiSQL";
const app = new App()

app.setRepository(new RepositoryApiSQL())
    .setNavgation({
        [Usuario.path]: Usuario,
    }, Login, app)