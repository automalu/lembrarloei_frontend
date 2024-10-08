import { Childrens, Options, StateBaseConstructor } from "../../navigation/state";
import Bot from "../bot";

export default function Childrens<Base extends StateBaseConstructor>(base: Base) {
    return class extends base {
        childrens: Childrens = {
            "b": Bot
        }
        options: Options = {
            "b": {
                title: "Bot",
                next: Bot
            }
        }
    }
}