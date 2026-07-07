import { ClienteService } from "../services/ClienteService.js";
import { askQuestion } from "../utils/cli.js";

export class ClienteController {
  private service = new ClienteService();

  async menu(): Promise<void> {
    let rodando = true;
    while (rodando) {
      console.log("\n--- GERENCIAR CLIENTES ---");
      console.log("1. Cadastrar Cliente");
      console.log("2. Listar Clientes");
      console.log("0. Voltar ao Menu Principal");

      const opcao = await askQuestion("Escolha uma opção: ");

      try {
        if (opcao === "1") {
          const nome = await askQuestion("Nome: ");
          const email = await askQuestion("Email: ");
          await this.service.cadastrar(nome, email);
          console.log("✅ Cliente cadastrado com sucesso!");
        } else if (opcao === "2") {
          console.table(await this.service.listarTodos());
        } else if (opcao === "0") {
          rodando = false;
        } else {
          console.log("Opção inválida.");
        }
      } catch (error: any) {
        console.error("❌ Erro:", error.message);
      }
    }
  }
}
