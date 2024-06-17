import { Zeyo, ZeyoAs } from "zeyo";
import App from "../../../../../app";
import style from "./style.module.css";
import ComponentMsgText from "../../../../../form/components/chat/msgComponentes/text";
import ComponentMsgItensCarrinho from "../../../../../form/components/chat/msgComponentes/itensCarrinho";
import ComponentMsgInput from "../../../../../form/components/chat/msgComponentes/input";
import ComponentMsgAnswer from "../../../../../form/components/chat/msgComponentes/answer";
import ComponentMsgSelect from "../../../../../form/components/chat/msgComponentes/select";
import ComponentMsgOrderStatus from "../../../../../form/components/chat/msgComponentes/orderStatus";

export default class ChatBody extends ZeyoAs<"div"> {
    app: App
    constructor(app: App) {
        super("div")
        this.app = app
        this.class(style.chat__body).object(o => {
            this.app.repositoryMemory.createTriggerTo("Chatmensagens", (m) => {
                this.setMsg(o, m)
            }, "create")

            /* Responsavel por fazer o scroll automatico no chat */
            const config = { childList: true };

            const callback: MutationCallback = function (mutationsList: MutationRecord[], observer: MutationObserver) {
                console.log(o.element)
                for (let mutation of mutationsList) {
                    console.log(mutation.type)
                    if (mutation.type === "childList") {
                        o.element.parentElement?.scrollTo(0, o.element.scrollHeight);
                    }
                }
            };

            const observer = new MutationObserver(callback);
            observer.observe(o.element, config);
        });
    }

    componentslist: { [key: string]: new (app: App, msg: any) => Zeyo } = {
        "text": ComponentMsgText,
        "orderlist": ComponentMsgItensCarrinho,
        "orderstatus": ComponentMsgOrderStatus,
        "input": ComponentMsgInput,
        "answer": ComponentMsgAnswer,
        "select": ComponentMsgSelect,
    }
    setMsg(o: Zeyo, msg: any) {
        console.log("===>", msg)
        o.children(
            new this.componentslist[msg.type](this.app, msg).class(msg.type != "orderlist" ? (msg.owner === "atendente" ? style.bot : style.user) : "freeballon").object(o => {
                if (msg.text && msg.text === "Olá") o.class(style["margin-change"])
            })
        )
    }
}