import L, { map } from "leaflet";
import App from "../../../../app";
import ButtonAccent from "../../../../component1.1/atoms/buttons/accent";
import Form from "../../../../form/2.0";
import FieldInput from "../../../../form/2.0/fields/input";
import FieldMap from "../../../../form/2.0/fields/map";
import ParceiroMarker from "../../../../form/2.0/fields/map/ParceiroMarker";
import Z from "zeyo";
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

export default class FormUpdateParceiro extends Form {
    app: App
    marker: L.Marker
    parceiro: any
    constructor(app: App, parceiro: any) {
        super()
        this.app = app
        this.title.text(parceiro.titulo)
        const icon = new ParceiroMarker({ iconUrl: parceiro.img, className: style.round })
        this.marker = L.marker([0, 0], { icon: icon })
        this.parceiro = parceiro
        this.header.removeChild(0)
        this.header.children(
            Z("div").class("d-flex", "gap-m", "a-center").children(
                Z("img").set("src", parceiro.img).class(style.round),
                this.title,
            ),
            new Icon("emoji")
        )
        this.body.children(
            new FieldInput("titulo").class("w-100").label("Título").setValue(parceiro.titulo),
            new FieldInput("instagram").class("w-100").label("Instagram").setValue(parceiro.instagram),
            Z("div").class("d-flex", "gap-g", "a-end").children(
                new FieldInput("endereco").class("w-100").label("Endereço").setValue(parceiro.endereco),
                new ButtonNoBG("").class("d-flex", "gap-m", "a-center", style.end).children(new Icon("map-marker"), "Geolocalização").click(() => {
                    const form = new FormUpdateCoodinates(this.app, this.parceiro)
                    Modal.push((form as any))
                })
            ),
            new FieldSemana("horarios").class("w-100").label("Horários").object(async o => {
                o.button.click(() => {
                    Modal.push(new FormHorarios(this.app, this.parceiro))
                })
                const [horarios, herr] = await this.app.repository.findMany("Horarios", { estabelecimento: this.parceiro.estabelecimento, restaurante: this.parceiro._id })
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
                const [subItens, err] = await this.app.repository.findMany("Itens", {
                    estabelecimento: this.parceiro.estabelecimento,
                    tipo: "promocao",
                    restaurante: this.parceiro._id
                })
                o.list.children(
                    ...subItens.map(i => {
                        return Z("div").class(o.style.object, "d-grid", "gap-m", "normaladapter").children(
                            Z("img").set("src", i.img),
                            Z("label").text(i.titulo)
                        ).click(e => Modal.push(new FormUpdatePromocao(this.app, i, [])))
                    }),
                    new ButtonNoBG("+ Adicionar").click(e => Modal.push(new FormPromocao(this.app, this.parceiro, [])))
                )
                o.list.children()
            }),
        )
        this.footer.children(
            new ButtonAccent("Atualizar")
        )
    }

    async onSubmit() {
        const { lat, lng } = this.getFieldsInObject()
        const coordinates = { lat: Number(lat.getValue()), lng: Number(lng.getValue()) }
        console.log(coordinates)
        console.log(this.parceiro)
        this.parceiro.coordinates = coordinates
        const [result, err] = await this.app.repository.update("Itens", this.parceiro._id, this.parceiro)
        console.log(result, err)
        Snackbar(this.app, Z("p").text("Salvo com sucesso!!"))
        Modal.back()
        console.log("aqui vai chamar o controller")
    }

    setMarker(lat: number, lng: number) {
        const map = (this.getFieldByKey("map") as FieldMap | undefined)
        if (!map) return;
        this.marker.addTo(map.container).setLatLng([lat, lng])
        map.container.setView([lat, lng], 16)
    }
}