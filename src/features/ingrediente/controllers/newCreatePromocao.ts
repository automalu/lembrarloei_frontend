import App from "../../../app";

export default class CreatePromocao {
    constructor(private readonly app: App) {
        this.app = app;
    }

    async execute(parceiro: any): Promise<void> {
        const promocao = {
            descricao: "novo",
            estabelecimento: parceiro.estabelecimento,
            link: "",
            preco: "",
            restaurante: parceiro._id,
            tipo: "promocao",
            titulo: "Novo",
            url: "",
        };

        promocao.url = promocao.titulo
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[" "]/g, "-");

        console.log(promocao);

        await this.app.repository.create("Itens", promocao);
    }
}
