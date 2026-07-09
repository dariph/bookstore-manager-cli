import { LivroService } from "../services/LivroService.js";
import { askQuestion } from "../utils/cli.js";

export class LivroController {
  private service = new LivroService();

  async menu(): Promise<void> {
    let rodando = true;
    while (rodando) {
      console.log("\n--- GERENCIAR LIVROS ---");
      console.log("1. Cadastrar Livro");
      console.log("2. Listar Livros");
      console.log("3. Remover Livro");
      console.log("0. Voltar ao Menu Principal");

      const opcao = await askQuestion("Escolha uma opção: ");

      try {
        if (opcao === "1") {
          const titulo = await askQuestion("Título: ");
          const autorId = parseInt(await askQuestion("ID do Autor: "));
          const quantidade = parseInt(
            await askQuestion("Quantidade disponível: "),
          );
          await this.service.cadastrar(titulo, autorId, quantidade);
          console.log("✅ Livro cadastrado com sucesso!");
        } else if (opcao === "2") {
          console.table(await this.service.listarTodos());
        } else if (opcao === "3") {
          const idRemover = parseInt(
            await askQuestion("ID do livro para remover: "),
          );
          await this.service.remover(idRemover);
          console.log("✅ Livro removido com sucesso!");
        } else if (opcao === "4") {
          const idBusca = parseInt(await askQuestion("ID do livro: "));
          console.table([await this.service.consultarPorId(idBusca)]);
        } else if (opcao === "5") {
          const idAtualizar = parseInt(
            await askQuestion("ID do livro para atualizar: "),
          );
          const titulo = await askQuestion("Novo título: ");
          const autorId = parseInt(await askQuestion("Novo ID do Autor: "));
          const quantidade = parseInt(
            await askQuestion("Nova quantidade disponível: "),
          );

          await this.service.atualizar(
            idAtualizar,
            titulo,
            autorId,
            quantidade,
          );
          console.log("✅ Livro atualizado com sucesso!");
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
