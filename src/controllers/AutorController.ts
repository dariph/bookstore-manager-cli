import { AutorService } from "../services/AutorService";
import { askQuestion } from "../utils/cli";

export class AutorController {
  private service = new AutorService();

  async menu(): Promise<void> {
    let rodando = true;
    while (rodando) {
      console.log("\n--- GERENCIAR AUTORES ---");
      console.log("1. Cadastrar Autor");
      console.log("2. Listar Autores");
      console.log("3. Consultar Autor por ID");
      console.log("4. Remover Autor");
      console.log("0. Voltar ao Menu Principal");

      const opcao = await askQuestion("Escolha uma opção: ");

      try {
        switch (opcao) {
          case "1":
            const nome = await askQuestion("Nome do autor: ");
            const nacionalidade = await askQuestion("Nacionalidade: ");
            await this.service.cadastrar(nome, nacionalidade);
            console.log("✅ Autor cadastrado com sucesso!");
            break;
          case "2":
            console.table(await this.service.listarTodos());
            break;
          case "3":
            const idBusca = parseInt(await askQuestion("ID do autor: "));
            console.table([await this.service.consultarPorId(idBusca)]);
            break;
          case "4":
            const idRemover = parseInt(
              await askQuestion("ID do autor para remover: "),
            );
            await this.service.remover(idRemover);
            console.log("✅ Autor removido com sucesso!");
            break;
          case "0":
            rodando = false;
            break;
          default:
            console.log("Opção inválida.");
        }
      } catch (error: any) {
        console.error("❌ Erro:", error.message);
      }
    }
  }
}
