import { AddOnConstructor } from "../../component1.1/addOn/lib";

export default function Lexical<Base extends AddOnConstructor>(base: Base){
    return class extends base {
        states: { [key: string]: { data: string, previous: string } } = {
            "normal": { data: "", previous: "" },
            "strong": { data: "", previous: "" },
            "inprocess": { data: "", previous: "" }
        }
        state = "normal"
        inprocess = false
        constructor(...args: any[]){
            super(args)
            this.object(o => {
                o.element.oninput = (e: any) => {
                    const c: string = e.data
                    if (e.data === null) {
                        if (e.inputType === "insertFromPaste") return
                        console.log(e.data, this.states[this.state], o.element.innerHTML, e.inputType)
                        if (o.element.innerHTML === "")
                            for (const key in this.states) {
                                this.states[key].data = ""
                            }
                        else if (this.state === "normal")
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
                        console.log(window.getSelection()?.getRangeAt(0).endOffset)
        
        
        
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
                    console.log(this.states[this.state].data)
                }
                o.element.addEventListener("focusin", () => {
                    if (!this.states["normal"].data.length)
                        o.element.innerText = ""
                })
                o.element.addEventListener("focusout", () => o.element.innerText = "Inserir Mensagem")
                let shift = false
                window.onkeydown = (e) => {
                    console.log(e)
                    this.inprocess = e.key === "Process"
                    if (document.activeElement === o.element) {
                        if (e.key === "Enter" && !shift) {
                            e.preventDefault()
                            this.states["normal"].data = ""
                            //this.sendMessage()
                        } else if (e.key === "Shift") shift = true
                    }
                }
                window.onkeyup = (e) => {
                    if (document.activeElement === o.element && e.key === "Shift") {
                        shift = false
                        console.log("soltou o shift")
                    }
                }
            })
        }
        
    }
}