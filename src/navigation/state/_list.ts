import State from ".";
import Estabelecimentos from "./estabelecimentos";
import User from "./user";

export default class States {
    static list: { [key: string]: typeof State } = {
        "user": User,
        "estabelecimentos": Estabelecimentos,
    }
}