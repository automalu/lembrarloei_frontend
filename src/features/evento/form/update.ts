import Z from "zeyo";
import App from "../../../app";
import ButtonAccent from "../../../component1.1/atoms/buttons/accent";
import Form from "../../../form/2.0";
import FieldInput from "../../../form/2.0/fields/input";
import ButtonNoBG from "../../../component1.1/atoms/buttons/noBg";
import FormCreateLembrete from "../../lembrete/form/create";
import Modal from "../../../modal";

export default class FormUpdateEvento extends Form {
    constructor(private app: App, private evento: any){
        super();
        this.title.text(evento.name)
        this.body.children(
            new FieldInput("name", true).class("w-100").label("Nome").setValue(this.evento.name),
            new FieldInput("date_time", true).label("Data").setType("datetime-local").setValue(this.evento.date_time),
            Z("div").class("w-100").children(
                Z("div").object(async o => {
                    const [lembretes, err] = await this.app.repository.readMany("Reminders", {})
                    if (err) return 
                    o.children(...lembretes.map((l: any) => Z("p").text(new Date(l.reminder_date).toLocaleString())))
                }),
                new ButtonNoBG("Adicionar Lembrete").click(() => {
                    Modal.push((new FormCreateLembrete(this.app, evento) as any))
                })
            )
        )
        this.footer.children(
            new ButtonAccent("Atualizar")
        )
    }
    onSubmit(): void {
        const data = this.getDataFromFields();
        console.log(data);
    }
}