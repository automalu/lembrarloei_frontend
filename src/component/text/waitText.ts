import Z from "zeyo"
import randomToken from "../../core/entity/RandomToken"

export default function WaitText<T extends keyof HTMLElementTagNameMap>(tagName: T, text: string) {
    return Z(tagName).text(text).object(o => {
        let n = 0
        o.element.id = randomToken(10)
        const interval = setInterval(() => {
            n++
            o.text(`${text}${Array(n).fill(".").join("")}`)
            if(n === 3) n = 0
            if(!document.getElementById(o.element.id))
                clearInterval(interval)
        },350)
    })
}