import { AddOnConstructor } from "../../../component1.1/addOn/lib";
/**
 * TODO: 
 * problemas para resolver o caret/cursor fica louco quando volta com a seta ou selecionan
 */
export default function Lexical<Base extends AddOnConstructor>(base: Base) {
    return class extends base {
        states: { [key: string]: { data: string, previous: string } } = {
            "normal": { data: "", previous: "" },
            "strong": { data: "", previous: "" },
            "inprocess": { data: "", previous: "" }
        }
        state = "normal"
        inprocess = false
        typing = false;
        isTypingCb?: (typing: boolean) => void;
        constructor(...args: any[]) {
            super(args)
            this.object(o => {
                o.element.oninput = (e: any) => {
                    const c: string = e.data
                    if(this.isTypingCb && !this.typing) {
                        this.typing = true
                        this.isTypingCb(true)
                    }
                    if (e.data === null) {
                        if (e.inputType === "insertFromPaste") return
                        console.log(e.data, this.states[this.state], o.element.innerText, e.inputType)
                        if (o.element.innerText.trim().length === 0){
                            if(this.isTypingCb) {
                                this.typing = false
                                this.isTypingCb(false)
                            }
                            o.element.innerText = "";
                            for (const key in this.states) {
                                this.states[key].data = "";
                            }
                        }else if (this.state === "normal")
                            this.states[this.state].data = o.element.innerHTML
                        else this.states[this.state].data = this.states[this.state].data.slice(0, -1)
                        return
                    }
                    if (this.inprocess && this.state !== "inprocess") {
                        this.states["inprocess"].previous = this.state
                        this.state = "inprocess"
                        return
                    }
                    if (this.state === "inprocess" && !this.inprocess) {
                        this.states[this.states[this.state].previous].data += this.states[this.state].data;
                        this.states[this.state].data = "";
                        this.state = this.states[this.state].previous
                        this.states["inprocess"].previous = "";
                    }
                    if (this.inprocess) {
                        this.states[this.state].data = c
                        return
                    }
                    if (c === "*" && this.state === "normal") {
                        //this.states[this.state].data += c
                        this.state = "strong"
                        return
                    } else if (c === "*" && this.state === "strong") {
                        this.state = "normal"
                        this.states[this.state].data += `<strong>${this.states["strong"].data}</strong>`

                        //this.states[this.state].data += c
                        this.states["strong"].data = ""
                        o.element.innerHTML = this.states[this.state].data;
                        const range = document.createRange();
                        const selection = window.getSelection();
                        range.setStart(o.element, o.element.childNodes.length);
                        range.collapse(true);
                        selection?.removeAllRanges();
                        selection?.addRange(range);
                        return
                    }

                    this.states[this.state].data += c
                }
                /* o.element.addEventListener("focusin", () => {
                    if (!this.states["normal"].data.length)
                        o.element.innerHTML = ""
                })
                o.element.addEventListener("focusout", () => {
                    if (!this.states["normal"].data.length)
                        o.element.innerText = "Inserir Mensagem"
                }) */
                
                
                window.addEventListener("keydown", (e) => {
                    this.inprocess = e.key === "Process"
                }) 
            })
        }

        isTyping(cb: (typing: boolean) => void): this {
            this.isTypingCb = cb
            return this
        }
    }
}