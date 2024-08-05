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
            new FieldInput("endereco").class("w-100").label("Título").setValue(parceiro.titulo),
            new FieldInput("endereco").class("w-100").label("Instagram").setValue(parceiro.instagram),
            new FieldInput("endereco").class("w-100").label("Endereço").setValue(parceiro.endereco),
        )
        this.footer.children(
            new ButtonAccent("Atualizar")
        )
    }

    async onSubmit() {
        const {lat, lng} = this.getFieldsInObject()
        const coordinates = {lat: Number(lat.getValue()), lng: Number(lng.getValue())}
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