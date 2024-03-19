import Z from "zeyo"

export default function Text<T extends keyof HTMLElementTagNameMap>(tagName: T, text: string) {
    return Z(tagName).text(text)
}