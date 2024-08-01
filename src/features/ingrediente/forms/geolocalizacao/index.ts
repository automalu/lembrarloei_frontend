import L from "leaflet";
import App from "../../../../app";
import ButtonAccent from "../../../../component1.1/atoms/buttons/accent";
import Form from "../../../../form/2.0";
import FieldInput from "../../../../form/2.0/fields/input";
import FieldMap from "../../../../form/2.0/fields/map";
import ParceiroMarker from "../../../../form/2.0/fields/map/ParceiroMarker";

export default class FormUpdateCoodinates extends Form {
    app: App
    lat: FieldInput
    lng: FieldInput
    constructor(app: App, parceiro: any) {
        super()
        this.app = app
        this.title.text(`GeoLocalização do ${parceiro.titulo}`)
        this.fields.children(
            new FieldInput("endereco").label("Endereço").setValue(parceiro.endereco),
            this.lat = new FieldInput("lat").label("Latitude").setValue(parceiro.coordinates ? parceiro.coordinates.lat : ""),
            this.lng = new FieldInput("lng").label("Longitude").setValue(parceiro.coordinates ? parceiro.coordinates.lng : ""),
            new FieldMap([0,0], 12).object(o => {
                //aqui tem que mostrar o marker do restaurante
                const icon = new ParceiroMarker({ iconUrl: parceiro.img, className: "style.round" })
                if(parceiro.coordinates) {
                    L.marker([parceiro.coordinates.lat, parceiro.coordinates.lng], { icon: icon }).addTo(o.container)
                }
                o.container.on("click", (e) => {
                    console.log(e.latlng)
                    this.lat.setValue(e.latlng.lat)
                    this.lat.setValue(e.latlng.lng)
                })
            })
        )
        this.footer.children(
            new ButtonAccent("Salvar")
        )
    }

    onSubmit(): void {
        const data = this.fieldsToObject()
        data["lat"].getValue()
        console.log("aqui vai chamar o controller")
    }
}