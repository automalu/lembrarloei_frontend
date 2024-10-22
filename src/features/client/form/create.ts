import App from "../../../app";
import ButtonAccent from "../../../component1.1/atoms/buttons/accent";
import Form from "../../../form/2.0";
import FieldInput from "../../../form/2.0/fields/input";
import FieldInputMask from "../../../form/2.0/fields/inputMask";
import FieldSelect from "../../../form/2.0/fields/select";

export default class FormCreateClient extends Form {
    constructor(private app: App){
        super();
        this.title.text("Novo Cliente")
        this.body.children(
            new FieldInput("name", true).class("w-100").label("Nome"),
            new FieldInput("email", true).label("Email"),
            new FieldInputMask("number", true).label("Número contato").mask("sms"),
            new FieldSelect("type", true).label("Tipo").options(
                {name: "Pagamento", value:"payment"},
                {name: "Lead", value:"lead"}
            ),
        )
        this.footer.children(
            new ButtonAccent("Criar")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        console.log(data);
        const result = await this.app.repository.create("Clients", data)
        console.log(result);
        //TODO: aqui tem que fechar o modal e adiciona na lista o evento
        this.app.hash.remove();
    }
}