import L, { map } from "leaflet";
import App from "../../../../app";
import ButtonAccent from "../../../../component1.1/atoms/buttons/accent";
import Form from "../../../../form/2.0";
import FieldInput from "../../../../form/2.0/fields/input";
import FieldMap from "../../../../form/2.0/fields/map";
import ParceiroMarker from "../../../../form/2.0/fields/map/ParceiroMarker";
import Z, { ZeyoAs } from "zeyo";
import style from "./style.module.css"
import Snackbar from "../../../../component/snackbar";
import Icon from "../../../../component1.1/icons";
import Modal from "../../../../modal";
import FieldSemana from "../../../../form/2.0/fields/semana";
import Button from "../../../../component1.1/atoms/buttons";
import FormHorarios from "../createHorarios";
import FieldObjectImg from "../../../../form/2.0/fields/objectImg";
import FormUpdatePromocao from "../updatePromocao";
import FormPromocao from "../createPromocao";
import ButtonNoBG from "../../../../component1.1/atoms/buttons/noBg";
import FormUpdateCoodinates from "../geolocalizacao";
import FieldFile from "../../../../form/2.0/fields/file";
import UpdateItem from "../../controllers/update";
import CreatePromocao from "../../controllers/newCreatePromocao";

export default class FormUpdateParceiro extends Form {
    app: App
    marker: L.Marker
    model: any
    constructor(app: App, parceiro: any) {
        super()
        this.app = app
        this.title.text(parceiro.titulo)
        const icon = new ParceiroMarker({ iconUrl: parceiro.img ? parceiro.img : "", className: style.round })
        this.marker = L.marker([0, 0], { icon: icon })
        this.model = parceiro
        this.header.removeChild(0)
        this.header.children(
            Z("div").class("d-flex", "gap-m", "a-center").children(
                Z("div").class(style.image).object(o => {
                    o.children(
                        new FieldFile("img", () => { }).class(style.hidden),
                        Z("img").set("src", parceiro.img).class(style.round),
                        new Icon("pen").class(style.edit).click(i => {
                            const file = (o.childList[0] as FieldFile)
                            const img = (o.childList[1] as ZeyoAs<"img">)
                            const button = (o.childList[3] as ButtonNoBG)
                            file.file.element.click()
                            file.file.element.onchange = (e) => {
                                const files = file.file.element.files
                                if (!files) return;
                                console.log("mudou", files[0])
                                var fr = new FileReader();
                                fr.onload = function () {
                                    console.log(fr.result)
                                    img.element.src = (fr.result as string);
                                }
                                fr.readAsDataURL(files[0]);
                                button.element.classList.add(style.show)
                            }
                        }),
                        new ButtonNoBG("").children(new Icon("check")).click((b) => {
                            const field = (o.childList[0] as FieldFile)
                            this.uploadFile(field.file.element, field.input.element)
                            b.element.classList.remove(style.show)
                        })
                    )
                }),
                this.title,
            ),
            new Icon("trash").click(() => {
                this.onDelete()
            })
        )
        this.body.children(
            new FieldInput("titulo", true).class("w-100").label("Título").setValue(parceiro.titulo),
            new FieldInput("instagram", true).class("w-100").label("Instagram").setValue(parceiro.instagram),
            Z("div").class("d-flex", "gap-g", "a-end").children(
                new FieldInput("endereco", true).class("w-100").label("Endereço").setValue(parceiro.endereco),
                new ButtonNoBG("").class("d-flex", "gap-m", "a-center", style.end).children(new Icon("map-marker"), "Geolocalização").click(() => {
                    const form = new FormUpdateCoodinates(this.app, this.model)
                    Modal.push((form as any))
                })
            ),
            new FieldSemana("horarios").class("w-100").label("Horários").object(async o => {
                o.button.click(() => {
                    Modal.push(new FormHorarios(this.app, this.model))
                })
                const [horarios, herr] = await this.app.repository.findMany("Horarios", { estabelecimento: this.model.estabelecimento, restaurante: this.model._id })
                horarios.forEach(h => o.dias.find(d => d.day === h.dia)?.component.children(
                    Z("div").class("d-flex", "gap-m", "a-center").children(
                        Z("span").class("d-flex", "gap-p", "a-center").children(Z("span").text(h.inicio), Z("label").text("-"), Z("span").text(h.fim)),
                        new Icon("pen"),
                    ).object((oh) => {
                        const inicio = oh.childList[0].childList[0]
                        const fim = oh.childList[0].childList[2]
                        const icon = (oh.childList[1] as Icon);
                        icon.click(async () => {
                            inicio.element.classList.toggle(style.editable)
                            fim.element.classList.toggle(style.editable)
                            if (icon.name === "pen") {
                                inicio.attribute("contenteditable", "true")
                                fim.attribute("contenteditable", "true");
                                icon.setIcons("check")
                            } else {
                                inicio.element.removeAttribute("contenteditable")
                                fim.element.removeAttribute("contenteditable");
                                icon.setIcons("pen")
                                const update = {
                                    estabelecimento: h.estabelecimento,
                                    inicio: inicio.element.innerText,
                                    fim: fim.element.innerText
                                }
                                console.log(update)
                                console.log(await this.app.repository.update("Horarios", h._id, update))

                            }
                        })
                    })
                ))
            }),
            new FieldObjectImg("filhos").label("Promoção").object(async o => {
                async function getPromocoes(parceiro: any, app: App) {
                    const [subItens, err] = await app.repository.findMany("Itens", {
                        estabelecimento: parceiro.estabelecimento,
                        tipo: "promocao",
                        restaurante: parceiro._id
                    })
                    o.list.HTML("").children(
                        ...subItens.map(i => {
                            return Z("div").class(o.style.object, "d-grid", "gap-m", "normaladapter").children(
                                Z("img").set("src", i.img),
                                Z("label").text(i.titulo)
                            ).click(e => Modal.push(new FormUpdatePromocao(app, i, [])))
                        }),
                        new ButtonNoBG("+ Adicionar").click(async e => {
                            await new CreatePromocao(app).execute(parceiro)
                            getPromocoes(parceiro, app)
                        })
                    )
                }
                getPromocoes(this.model, this.app)
            }),
        )
        this.footer.children(
            new ButtonAccent("Atualizar")
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields()
        console.log(data)
        Object.assign(this.model, data)
        this.title.text(this.model.titulo)
        const [result, err] = await this.app.repository.update("Itens", this.model._id, this.model)
        console.log(result, err)
    }

    setMarker(lat: number, lng: number) {
        const map = (this.getFieldByKey("map") as FieldMap | undefined)
        if (!map) return;
        this.marker.addTo(map.container).setLatLng([lat, lng])
        map.container.setView([lat, lng], 16)
    }

    async uploadFile(input: HTMLInputElement, element: HTMLInputElement) {
        Snackbar(this.app, Z("p").text("Enviando imagem ⏳"))
        if (!input.files) return console.log("sem arquivo")
        if (input.files && input.files[0].size > 104857600) {
            return console.error("tamanho invalido");
        }
        const data = new FormData()
        data.append("estabelecimento", this.model.estabelecimento)
        data.append("params", JSON.stringify([{ width: 200, quality: 60 }]))
        data.append("element", this.model._id)
        data.append("file", input.files[0])
        console.log(data);
        const request = new XMLHttpRequest();
        request.onreadystatechange = async () => {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText)
                const [result, err] = JSON.parse(request.responseText)
                if (err) return console.error(result)
                console.log(result)
                Snackbar(this.app, Z("p").text("Imagem Enviada 👍, salvando..."))
                element.value = `https://image.zeyo.org/img/${this.model.estabelecimento}/q60_w200/${result}`
                this.model.img = element.value
                this.onSubmit()
                Snackbar(this.app, Z("p").text("Imagem Salva 😎"))
            } else if (request.status > 300) return
        }
        //request.open("POST", `${server.url}/uploadfile`)
        request.open("POST", `${process.env.SERVER_URL || "https://backend.alasmenu.com"}/uploadfile`)
        /* request.setRequestHeader("accessToken", (await getStorage("accessToken")).value)
        request.setRequestHeader("refreshToken", (await getStorage("refreshToken")).value) */
        request.send(data)
    }

    delete = true
    async onDelete(): Promise<void> {
        const [listaSubItens, lerr] = await this.app.repository.findMany("Itens", {
            estabelecimento: this.model.estabelecimento,
            tipo: "promocao",
            restaurante: this.model._id
        })
        listaSubItens.forEach(async i => {
            const [result, err] = await this.app.repository.delete("Itens", i._id)
            console.log("Deletando Sub Itens", result, err)
        })
        const [result, err] = await this.app.repository.delete("Itens", this.model._id)
        console.log(result, err)
        //TODO: tem que remover da lista
        /* const maped = this.lista.map(i => i._id)
        const index = maped.indexOf(this.model._id)
        if (index > -1) {
            this.lista.splice(index, 1);
        } */
        this.app.hash.remove()
    }
}