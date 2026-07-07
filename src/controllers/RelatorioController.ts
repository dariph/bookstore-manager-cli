import { RelatorioRepository } from "../repositories/RelatorioRepository.js";
import { askQuestion } from "../utils/cli.js";

export class RelatorioController {
  private repo = new RelatorioRepository();

  async menu(): Promise<void> {
    let rodando = true;
    while (rodando) {
      console.log("\n--- RELATÓRIOS ---");
      console.log("1. Livros Emprestados Atualmente");
      console.log("2. Quantidade de Empréstimos por Livro");
      console.log("0. Voltar ao Menu Principal");

      const opcao = await askQuestion("Escolha uma opção: ");

      try {
        if (opcao === "1") {
          console.table(await this.repo.listarLivrosEmprestados());
        } else if (opcao === "2") {
          console.table(await this.repo.listarQuantidadeEmprestimosPorLivro());
        } else if (opcao === "0") {
          rodando = false;
        } else {
          console.log("Opção inválida.");
        }
      } catch (error: any) {
        console.error("❌ Erro ao gerar relatório:", error.message);
      }
    }
  }
}
