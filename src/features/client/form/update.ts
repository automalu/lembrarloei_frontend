import App from "../../../app";
import ButtonAccent from "../../../component1.1/atoms/buttons/accent";
import Form from "../../../form/2.0";
import FieldInput from "../../../form/2.0/fields/input";
import FieldInputMask from "../../../form/2.0/fields/inputMask";
import FieldSelect from "../../../form/2.0/fields/select";

export default class FormUpdateClient extends Form {
    constructor(private app: App, client: any){
        super();
        this.title.text("Novo Cliente")
        this.body.children(
            new FieldInput("name", true).class("w-100").label("Nome").setValue(client.name),
            new FieldInput("email", true).label("Email").setValue(client.email),
            new FieldInputMask("number", true).label("Número contato").mask("sms").setValue(client.number),
            new FieldSelect("type", true).label("Tipo").options(
                {name: "Pagamento", value:"payment"},
                {name: "Lead", value:"lead"}
            ).setValue(client.type),
        )
        this.footer.children(
            new ButtonAccent("Atualizar")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        console.log(data);
        //const result = await this.app.repository.update("Clients", data)
        //console.log(result);
        //TODO: aqui tem que fechar o modal e adiciona na lista o evento
        this.app.hash.remove();
    }
}