import App from "../../../../app";
import ButtonAccent from "../../../../component1.1/atoms/buttons/accent";
import Form from "../../../../form/2.0";
import FieldInput from "../../../../form/2.0/fields/input";
import Field from "../../../../form/2.0/fields/field";

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
            this.lat = new FieldInput("lat").label("Latitude").setValue(parceiro.coordinates.lat),
            this.lng = new FieldInput("lng").label("Longitude").setValue(parceiro.coordinates.lng)
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