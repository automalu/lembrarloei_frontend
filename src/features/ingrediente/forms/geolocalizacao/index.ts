import L from "leaflet";
import App from "../../../../app";
import ButtonAccent from "../../../../component1.1/atoms/buttons/accent";
import Form from "../../../../form/2.0";
import FieldInput from "../../../../form/2.0/fields/input";
import FieldMap from "../../../../form/2.0/fields/map";
import ParceiroMarker from "../../../../form/2.0/fields/map/ParceiroMarker";
import Z from "zeyo";

export default class FormUpdateCoodinates extends Form {
    app: App
    lat: FieldInput
    lng: FieldInput
    constructor(app: App, parceiro: any) {
        super()
        this.app = app
        this.title.text(`GeoLocalização do ${parceiro.titulo}`)
        this.body.children(
            Z("div").class("d-flex", "gap-g").children(
                new FieldInput("endereco").class("w-100").label("Endereço").setValue(parceiro.endereco),
                new ButtonAccent("Pesquisar").set("type", "button").click(() => {
                    const endereco = this.getValueByKey("endereco")
                    console.log(endereco)
                    console.log(this.getValueByKey("lat"))
                    console.log(this.getValueByKey("lng"))
                    console.log(this.getFieldsInObject())
                    /* await new Promise(res => setTimeout(() => res(true), 2000));

                    const { coordinates, error } = await new Promise(Pres => {
                        const options = {
                            hostname: 'api.opencagedata.com',
                            port: 443,
                            path: `/geocode/v1/json?q=${encodeURIComponent(p.endereco.trim())}&key=7f2658a05bbb4ef1a5e0adff540a04cb`,
                            method: 'GET',
                        };

                        const req = https.request(options, (res) => {
                            let datachunk = ''
                            res.on('data', (chunk) => {
                                datachunk += chunk.toString()
                            });
                            res.on('end', () => {
                                const data = JSON.parse(datachunk)
                                console.log(Object.keys(data));
                                if (data.results[1])
                                    Pres({ coordinates: data.results[1].geometry, error: false })
                                else
                                    Pres({ coordinates: data.results[1], error: true })
                            })
                        });

                        req.on('error', (error) => {
                            Pres({ coordinates: error, error: true })
                        });

                        req.end();
                    })

                    if (!error) {
                        p.coordinates = coordinates
                        console.log(p.titulo, " - ", p.coordinates)
                    } else console.error(p.titulo, coordinates) */
                })
            ),
            Z("div").class("d-flex", "gap-g").children(
                this.lat = new FieldInput("lat").class("w-100").label("Latitude").setValue(parceiro.coordinates ? parceiro.coordinates.lat : ""),
                this.lng = new FieldInput("lng").class("w-100").label("Longitude").setValue(parceiro.coordinates ? parceiro.coordinates.lng : ""),
            ),
            new FieldMap([0, 0], 5).object(o => {
                //aqui tem que mostrar o marker do restaurante
                const icon = new ParceiroMarker({ iconUrl: parceiro.img, className: "style.round" })
                if (parceiro.coordinates) {
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
        const data = this.getFieldsInObject()
        data["lat"].getValue()
        console.log("aqui vai chamar o controller")
    }
}