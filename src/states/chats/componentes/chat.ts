import Z, { ZeyoAs } from "zeyo";
import App from "../../../app";
/**
 * TODO: 
 * problemas para resolver o caret/cursor fica louco quando volta com a seta ou selecionan
 */
export default class Chat extends ZeyoAs<"div"> {
    input: ZeyoAs<"span">
    chatbody: ZeyoAs<"div">
    constructor(app: App) {
        super("div")
        this.class("d-grid", "gap-m").children(
            Z("h2").text("Conversas"),
            Z("label").text("Pesquisar conversas"),
            Z("div").class("body").children(
                this.chatbody = Z("div").class("chat"),
                Z("div").class("footer", "d-flex", "gap-m").children(
                    Z("div").class("attachment").children(
                        Z("button").class("icon", "emoji"),
                        Z("button").class("icon", "plus")
                    ),
                    Z("div").class("w-100").children(
                        this.input = Z("span").attribute("contenteditable", "true").text("Inserir Mensagem").object(o => {
                            const states: { [key: string]: {data: string, previous: string} } = {
                                "normal": {data: "", previous: ""},
                                "strong": {data: "", previous: ""},
                                "inprocess": {data: "", previous: ""}
                            }
                            let state = "normal"
                            let inprocess = false
                            o.element.oninput = (e: any) => {
                                const c: string = e.data
                                //se saiu do process então tem que valtar
                                
                                if (e.data === null) {
                                    if(e.inputType === "insertFromPaste") return
                                    console.log(e.data, states[state], o.element.innerHTML, e.inputType)
                                    if (o.element.innerHTML === "")
                                        for (const key in states) {
                                            states[key].data = ""
                                        }
                                    else if (state === "normal")
                                        states[state].data = o.element.innerHTML
                                    else states[state].data = states[state].data.slice(0, -1)
                                    return
                                }
                                if(inprocess && state !== "inprocess") {
                                    states["inprocess"].previous = state
                                    state = "inprocess"
                                    return 
                                }
                                if(state === "inprocess" && !inprocess) {
                                    states[states[state].previous].data += states[state].data;
                                    states[state].data = "";
                                    state = states[state].previous
                                    states["inprocess"].previous = "";
                                }
                                if(inprocess) {
                                    states[state].data = c
                                    return
                                }
                                if (c === "*" && state === "normal") {
                                    //states[state].data += c
                                    state = "strong"
                                    return
                                } else if (c === "*" && state === "strong") {
                                    state = "normal"
                                    states[state].data += `<strong>${states["strong"].data}</strong>`
                                    
                                    //states[state].data += c
                                    states["strong"].data = ""
                                    console.log(window.getSelection()?.getRangeAt(0).endOffset)
                                    
                                    

                                    o.element.innerHTML = states[state].data;

                                    const range = document.createRange();
                                    const selection = window.getSelection();
                                    range.setStart(o.element, o.element.childNodes.length);
                                    range.collapse(true);
                                    selection?.removeAllRanges();
                                    selection?.addRange(range);
                                    return
                                }

                                states[state].data += c
                                console.log(states[state].data)
                            }
                            /* o.element.addEventListener("focusin", () => {
                                console.log("+++++> TRIGGER FOCUS")
                                o.element.innerText = ""
                            }) */
                            //o.element.addEventListener("focusout", () => o.element.innerText = "Inserir Mensagem")
                            let shift = false
                            window.onkeydown = (e) => {
                                console.log(e)
                                inprocess = e.key === "Process"
                                if (document.activeElement === o.element) {
                                    if (e.key === "Enter" && !shift) {
                                        e.preventDefault()
                                        states["normal"].data = ""
                                        this.sendMessage()
                                    } else if (e.key === "Shift") shift = true
                                }
                            }
                            window.onkeyup = (e) => {
                                if (document.activeElement === o.element && e.key === "Shift") {
                                    shift = false
                                    console.log("soltou o shift")
                                }
                            }
                        }),
                    ),
                    Z("div").class("attachment").children(
                        Z("button").class("icon", "mic"),
                        Z("button").class("icon", "send").text("enviar").click(() => {
                            this.sendMessage()

                        })
                    ),
                    Z("span").attribute("contenteditable", "true").text("teste"),

                )
            )
        )
    }

    sendMessage() {
        this.chatbody.children(Z("div").HTML(this.input.element.innerHTML))
        this.input.element.innerHTML = ""
    }

    /* lexical(str: string) {
        let result = ""
        let aux = ""
        const states: { [key: string]: string } = {
            "normal": result,
            "strong": aux
        }
        let state = "normal"
        for (const c of str) {
            if (c === "*" && state === "normal") {
                states[state] += c
                state = "strong"
                continue
            } else
                if (c === "*" && state === "strong") {
                    state = "normal"
                    states[state] += `<strong>${aux}</strong>`
                    states[state] += c
                    continue
                }

            states[state] += c
        }
        return result
    } */
}