import Z, { ZeyoAs } from "zeyo";
import style from "./card.module.css";

export function CardEmpty(): ZeyoAs<"div"> {
    return Z("div").class(style["card"])
}
export default function Card(...child: Array<ZeyoAs<keyof HTMLElementTagNameMap> | string>): ZeyoAs<"div"> {
    return CardEmpty().children(...child)
}