import App from "../../../app";
import ButtonAccent from "../../../component1.1/atoms/buttons/accent";
import Form from "../../../form/2.0";
import FieldInput from "../../../form/2.0/fields/input";

export default class FormCreateEvento extends Form {
    constructor(private app: App){
        super();
        this.title.text("Novo Evento")
        this.body.children(
            new FieldInput("name", true).class("w-100").label("Nome"),
            new FieldInput("date_time", true).label("Data").setType("datetime-local"),
        )
        this.footer.children(
            new ButtonAccent("Criar")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        console.log(data);
        const result = await this.app.repository.create("Events", data)
        console.log(result);
    }
}