import App from "../../../app";
import ButtonAccent from "../../../component1.1/atoms/buttons/accent";
import Form from "../../../form/2.0";
import FieldInput from "../../../form/2.0/fields/input";
import FieldInputMask from "../../../form/2.0/fields/inputMask";
import FieldTextarea from "../../../form/2.0/fields/textarea";

export default class FormCreateEvento extends Form {
    constructor(private app: App, private client: any){
        super();
        this.title.text("Novo Evento")
        const phone = client.number.replace("9", "").substr(2);
        this.body.children(
            new FieldInput("name", true).class("w-100").label("Nome").setValue(client.type === "payment" ? "Pagamento Boleto": ""),
            new FieldInput("date_time", true).label("Data").setType("datetime-local"),
            new FieldInputMask("phone", true).label("Número Whatsapp").mask("whatsapp").setValue(phone),
            new FieldTextarea("message", true).label("Mensagem").setValue(`Olá, *${client.name}*, tudo bem?\nFaça o pagamento do Boleto!`)
        )
        this.footer.children(
            new ButtonAccent("Criar")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        console.log(data);
        data["client_id"] = this.client.id;
        const result = await this.app.repository.create("Events", data)
        console.log(result);
        //TODO: aqui tem que fechar o modal e adiciona na lista o evento
        this.app.hash.remove();
    }
}