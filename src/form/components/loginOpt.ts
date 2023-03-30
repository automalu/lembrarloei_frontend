import Z from "zeyo";
//import FormStore from "../../features/user/state/_store";

export default class LoginOpt {
    main = Z("p")
    create(texts: {pergunta: string; acao: string}){
        return this.main = Z("p").object(z => z.element.innerText = `${texts.pergunta} `).children(
            Z("b").class("pointer").object(z => {
                z.element.innerText = `${texts.acao}`
                z.element.style.textDecoration = "underline"
                //z.element.onclick = async () => FormStore.changeState("acao")
            })
        )
    }
}