import { ClienteService } from "../services/ClienteService.js";
import { askQuestion } from "../utils/cli.js";

export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  async menu(): Promise<void> {
    let rodando = true;
    while (rodando) {
      console.log("\n--- GERENCIAR CLIENTES ---");
      console.log("1. Cadastrar Cliente");
      console.log("2. Listar Clientes");
      console.log("3. Consultar Cliente por ID");
      console.log("4. Atualizar Cliente");
      console.log("5. Inativar Cliente");
      console.log("0. Voltar ao Menu Principal");

      const opcao = await askQuestion("Escolha uma opção: ");

      try {
        if (opcao === "1") {
          const nome = await askQuestion("Nome: ");
          const email = await askQuestion("Email: ");
          await this.clienteService.cadastrar(nome, email);
          console.log("✅ Cliente cadastrado com sucesso!");
        } else if (opcao === "2") {
          console.table(await this.clienteService.listarTodos());
        } else if (opcao === "3") {
          const idBusca = parseInt(await askQuestion("ID do cliente: "));
          console.table([await this.clienteService.consultarPorId(idBusca)]);
        } else if (opcao === "4") {
          const idAtualizar = parseInt(
            await askQuestion("ID do cliente para atualizar: "),
          );
          const nome = await askQuestion("Novo nome: ");
          const email = await askQuestion("Novo email: ");
          await this.clienteService.atualizar(idAtualizar, nome, email);
          console.log("✅ Cliente atualizado com sucesso!");
        } else if (opcao === "5") {
          const idRemover = parseInt(
            await askQuestion("ID do cliente para inativar: "),
          );
          await this.clienteService.remover(idRemover);
          console.log("✅ Cliente inativado com sucesso!");
        } else if (opcao === "0") {
          rodando = false;
        } else {
          console.log("Opção inválida.");
        }
      } catch (error: unknown) {
        const mensagem = error instanceof Error ? error.message : String(error);
        console.error("❌ Erro:", mensagem);
      }
    }
  }
}
