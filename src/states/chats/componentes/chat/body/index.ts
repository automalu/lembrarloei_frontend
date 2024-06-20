import { Zeyo, ZeyoAs } from "zeyo";
import App from "../../../../../app";
import style from "./style.module.css";
import ComponentMsgText from "../../../../../form/components/chat/msgComponentes/text";
import ComponentMsgItensCarrinho from "../../../../../form/components/chat/msgComponentes/itensCarrinho";
import ComponentMsgInput from "../../../../../form/components/chat/msgComponentes/input";
import ComponentMsgAnswer from "../../../../../form/components/chat/msgComponentes/answer";
import ComponentMsgSelect from "../../../../../form/components/chat/msgComponentes/select";
import ComponentMsgOrderStatus from "../../../../../form/components/chat/msgComponentes/orderStatus";
import Participante from "../../../../../form/components/chat/participante";

export default class ChatBody extends ZeyoAs<"div"> {
    app: App
    lastTrigger = ""
    lastMsg:{owner: string, component: any} = {owner: "", component: {}}
    participante: Participante
    constructor(app: App, participante: Participante) {
        super("div")
        this.app = app
        this.class(style.chat__body);
        this.participante = participante
        /* Responsavel por fazer o scroll automatico no chat */
        const config = { childList: true };
        const callback: MutationCallback = this.callbackMutationObserver.bind(this);
        const observer = new MutationObserver(callback);
        observer.observe(this.element, config);
    }

    callbackMutationObserver(mutationsList: MutationRecord[], observer: MutationObserver) {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
                this.element.parentElement?.scrollTo(0, this.element.scrollHeight);
            }
        }
    };

    setChat(chat: any) {
        this.HTML("").object(async o => {
            const [msgs, err] = await this.app.repositoryMemory.findMany("Chatmensagens", { chat: chat._id })
            if (err) return
            msgs.forEach(m => {
                this.setMsg(m)
            })
        });
        if(this.lastTrigger != "")
            this.app.repositoryMemory.deleteTrigger("Chatmensagens", "create", this.lastTrigger)
        this.lastTrigger = this.app.repositoryMemory.createTriggerTo("Chatmensagens", (m) => {
            if (m.chat === chat._id) this.setMsg(m)
        }, "create");
    }

    componentslist: { [key: string]: new (app: App, msg: any) => Zeyo } = {
        "text": ComponentMsgText,
        "orderlist": ComponentMsgItensCarrinho,
        "orderstatus": ComponentMsgOrderStatus,
        "input": ComponentMsgInput,
        "answer": ComponentMsgAnswer,
        "select": ComponentMsgSelect,
    }
    setMsg(msg: any) {
        console.log("===>", msg.owner, this.participante.id)
        this.children(
            this.lastMsg.component = new this.componentslist[msg.type](this.app, msg).class(msg.type != "orderlist" ? (msg.owner === this.participante.id ? style.user : style.foreign) : "freeballon").object(o => {
                o.class(style.last)
                if(this.lastMsg.owner === msg.owner) {
                    this.lastMsg.component.element.classList.remove(style.last)
                    this.lastMsg.component.element.classList.add(style.before)
                    o.class(style.after)
                    return
                }else 
                 o.class(style["margin-change"])
            })
        )
        this.lastMsg.owner = msg.owner
    }
}